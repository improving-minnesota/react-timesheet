var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var actions = require('../actions/login.actions');
var notifications = require('../services/notifications');
var agent = require('../services/agent.promise');

var LoginStore = merge(store, {

  initialized: false,

  initialize: function () {
    if (!this.initialized) {
      var events = {};
      events[actions.LOGIN]   = this.login;
      events[actions.LOGOUT]  = this.logout;
      events[actions.CURRENT_USER] = this.current

      this.loginUrl = '/login';
      this.logoutUrl = '/logout';

      this.register(events);
      this.setState({
        current: {},
        context: {}
      });

      this.initialized = true;
    }

    return this;
  },

  current: function (payload) {
    var self = this;

    return agent.get(this.loginUrl)
      .end()
      .then(function (res) {
        self.setState({current: res.body});
        return true;
      })
      .catch(function (data) {
        notifications.error('There was an error getting the employee');
      });
  },

  login: function (payload) {
    var self = this;

    return agent.post(this.loginUrl)
      .end()
      .then(function (res) {
        self.setState({employee: res.body});
        notifications.success('Employee : ' + res.body.username + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating employee.');
      });
  },

  logout: function (payload) {
    var self = this;

    return agent.post(this.logoutUrl)
      .end()
      .then(function (res) {
        self.setState({employee: res.body});
        notifications.success('Employee : ' + res.body.username + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating employee.');
      });
  }
});

module.exports = LoginStore;
