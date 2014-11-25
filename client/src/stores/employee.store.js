var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var notifications = require('../services/notifications');
var agent = require('superagent-promise');

var EmployeeStore = merge(store, {

  initialized: false,

  initialize: function () {
    if (!this.initialized) {
      var events = {};
      events[constants.LIST_EMPLOYEES]   = this.list;
      events[constants.GET_EMPLOYEE]     = this.get;
      events[constants.UPDATE_EMPLOYEE]  = this.update;
      events[constants.DELETE_EMPLOYEE]  = this.remove;
      events[constants.RESTORE_EMPLOYEE] = this.restore;
      events[constants.CREATE_EMPLOYEE]  = this.create;

      this.url = '/users';

      this.register(events);
      this.setState({
        employee: {},
        employees: []
      });

      this.initialized = true;
    }

    return this;
  },

  list: function () {
    var self = this;

    return agent.get(this.url).end()
      .then(function (res) {
        self.setState({employees: res.body});
      },
      function (x) {
        notifications.error('Error attempting to retrieve employees.');
      });
  },

  get: function (payload) {
    var self = this;

    return agent.get(this.url + '/' + payload.action.employee._id).end()
      .then(function (res) {
        self.setState({employee: res.body});
        return true;
      },
      function (data) {
        notifications.error('There was an error getting the employee');
      });
  },

  update: function (payload) {
    var self = this;
    var employee = payload.action.employee;

    return agent.put(this.url + '/' + employee._id)
      .send(employee)
      .end()
      .then(function (res) {
        self.setState({employee: res.body});
        notifications.success('Employee : ' + employee.username + ', updated.');
      },
      function (x) {
        notifications.error('There was an error updating employee.');
      });
  },

  remove: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = true;

    return agent.put(this.url + '/' + employee._id)
      .send(employee)
      .end()
      .then(function (res) {
        self.setState({employee: res.body});
        notifications.success('Employee : ' + res.body.username + ', was restored.');
        return true;
      },
      function (x) {
        notifications.error('Error attempting to delete employee.');
      });
  },

  restore: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = false;

    var prom = agent.put(this.url + '/' +employee._id).send(employee).end()
      .then(function (res) {
        self.setState({employee: res.body});
        notifications.success('Employee : ' + res.body.username + ', was deleted.');
        return true;
      },
      function (x) {
        notifications.error('Error attempting to restore employee.');
      });

    return prom;
  },

  create: function (payload) {
    var self = this;

    return agent.post(this.url)
      .send(payload.action.employee)
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

module.exports = EmployeeStore;
