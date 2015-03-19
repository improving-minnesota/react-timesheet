var _ = require('lodash');
var Router = require('react-router');
var Promise = require('es6-promise').Promise;

var Store = require('../flux/flux.store');
var actions = require('../actions/login.actions');
var axios = require('axios');
var assign = require('object-assign');

var LoginStore = assign({}, Store, {

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
      user: {_id: 'all'},
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
      console.log('Welcome back, ' + this.getState().user.username + '.');
      return Promise.resolve(self.getState());
    }
    else {
      return axios.get(self.loginUrl)
        .then(function (res) {
          self.setState({
            authenticated: res.data.authenticated,
            user: res.data.user
          });
          console.log('Welcome back, ' + res.data.user.username + '.');
          return self.getState();
        })
        .catch(function (data) {
          console.log('There was an error getting the current user');
        });
    }
  },

  login: function (payload) {
    var self = this;

    return axios.post(this.loginUrl, payload.action.credentials)
      .then(function (res) {
        var authenticated = res.data.authenticated;
        self.setState({
          authenticated: authenticated,
          user: res.data.user
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

          console.log('Welcome back, ' + res.data.user.username + '.');
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

    return axios.post(this.logoutUrl)
      .then(function (res) {
        self.initState();
        window.location.assign('/#/login');
      })
      .catch(function (x) {
        console.log('There was an error logging out.');
      });
  },

  requireAuthenticatedUser: function (transition) {
    var self = this;

    return new Promise(function (resolve, reject) {
      var authCheckInterval = setInterval(function () {
        if (self.getState().authenticated) {
          clearInterval(authCheckInterval);
          resolve(true);
        }
      }, 200);

      if (!self.getState().authenticated && transition.path !== '/login') {
        self.setState({pausedTransition: transition});
        transition.redirect('/login');
      }
    });
  }
});

module.exports = LoginStore.initialize();
