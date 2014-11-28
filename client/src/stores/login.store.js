var merge = require('react/lib/merge');
var q = require('q');

var store = require('../flux/flux.store');
var actions = require('../actions/login.actions');
var notifications = require('../services/notifications');
var agent = require('../services/agent.promise');
var queue = require('../services/retry.queue');

var LoginStore = merge(store, {

  initialize: function () {

    this.loginUrl = '/login';
    this.logoutUrl = '/logout';
    this.authErrorMessage = 'Invalid username and password combination.';

    var events = {};
    events[actions.LOGIN]   = this.login;
    events[actions.LOGOUT]  = this.logout;
    events[actions.CURRENT_USER] = this.current;
    this.register(events);

    this.setState({
      user: {},
      authenticated: false,
      credentials: {}
    });

    return this;
  },

  current: function (payload) {
    var self = this;

    if (this.getState().authenticated) {
      return q.when(true);
    }
    else {
      return agent.get(this.loginUrl)
        .end()
        .then(function (res) {
          self.setState({
            authenticated: res.body.authenticated,
            user: res.body.user
          });
          return true;
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

        // if we've successfully authenticated, retry any delayed requests
        if (authenticated) {
          queue.retryAll();
          self.setState({authError: false, authReason: false});
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
        self.setState({
          user: {},
          authenticated: false
        });
        // navigate away from wherever we are and back to login page
        window.location.assign('/');
      })
      .catch(function (x) {
        notifications.error('There was an error logging out.');
      });
  }
});

module.exports = LoginStore.initialize();
