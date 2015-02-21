var _ = require('lodash');
var Router = require('react-router');
var q = require('q');

var Store = require('../flux/flux.store');
var actions = require('../actions/login.actions');
var notifications = require('../services/notifications');
var agent = require('../services/agent.promise');

var LoginStore = _.extend(_.clone(Store), {

  initialize: function () {

    this.loginUrl = '/login';
    this.logoutUrl = '/logout';
    this.authErrorMessage = 'Invalid username and password combination.';

    var events = {};
    events[actions.LOGIN]   = this.login;
    events[actions.LOGOUT]  = this.logout;
    events[actions.CURRENT_USER] = this.current;
    this.register(events);
    this.initState();

    return this;
  },

  initState: function () {
    this.setState({
      user: {},
      authenticated: false,
      credentials: {},
      pausedTransition: null
    });
  },

  getUserId: function () {
    var user = this.getState().user;
    return (user !== null && user._id) ? user._id : 'all';
  },

  current: function (payload) {
    var self = this;

    if (this.getState().authenticated) {
      return q.when(self.getState());
    }
    else {
      return agent.get(self.loginUrl)
        .end()
        .then(function (res) {
          self.setState({
            authenticated: res.body.authenticated,
            user: res.body.user
          });
          return self.getState();
        })
        .catch(function (data) {
          notifications.error('There was an error getting the current user');
        });
    }
  },

  login: function (payload) {
    var self = this;

    return agent.post(this.loginUrl)
      .send(payload.action.credentials)
      .end()
      .then(function (res) {
        var authenticated = res.body.authenticated;
        self.setState({
          authenticated: authenticated,
          user: res.body.user
        });

        if (authenticated) {
          self.setState({authError: null, authReason: null});

          var pausedTransition = self.getState().pausedTransition;
          if (pausedTransition) {
            pausedTransition.retry();
            self.setState({pausedTransition: null});
          }
          else {
            window.location.assign('/');
          }

          notifications.success('Welcome back, ' + res.body.user.username + '.');
        }
        else {
          self.setState({authError: self.authErrorMessage});
        }
      })
      .catch(function (x) {
        self.setState({authError: self.authErrorMessage});
      });
  },

  logout: function (payload) {
    var self = this;

    return agent.post(this.logoutUrl)
      .end()
      .then(function (res) {
        self.initState();
        self.showLogin();
      })
      .catch(function (x) {
        notifications.error('There was an error logging out.');
      });
  },

  requireAuthenticatedUser: function (transition) {
    var self = this;
    var deferred = q.defer();

    var authCheckInterval = setInterval(function () {
      if (self.getState().authenticated) {
        clearInterval(authCheckInterval);
        deferred.resolve(true);
      }
    }, 200);

    if (!self.getState().authenticated && transition.path !== '/login') {
      self.setState({pausedTransition: transition});
      transition.redirect('/login');
    }

    return deferred.promise;
  }
});

module.exports = LoginStore.initialize();
