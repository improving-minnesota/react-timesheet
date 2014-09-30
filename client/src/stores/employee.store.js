var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var data = require('../data/data');
var notifications = require('../services/notifications');

var EmployeeStore = merge(store, {
  
  initialize: function () {
    var events = {};
    events[constants.LIST_EMPLOYEES] = this.list;
    events[constants.GET_EMPLOYEE] = this.get;
    events[constants.UPDATE_EMPLOYEE] = this.update;
    events[constants.DELETE_EMPLOYEE] = this.remove;
    events[constants.RESTORE_EMPLOYEE] = this.restore;
    events[constants.CREATE_EMPLOYEE] = this.create;

    this.register(events);
    this.setState({
      employee: {}, 
      employees: []
    });

    return this;
  },

  list: function () {
    var self = this;

    return data.list('employees')
      .then(function (employees) {
        self.setState({employees: employees});
      })
      .catch(function (x) {
        notifications.error('Error attempting to retrieve employees.');
      });
  },

  get: function (payload) {
    var self = this;

    return data.get('employees', {_id: payload.action.employee.id})
      .then(function (employee) {
        self.setState({employee: employee});
      })
      .catch(function (data) {
        notifications.error('There was an error getting the employee');
      });
  },

  update: function (payload) {
    var self = this;

    return data.update('employees', payload.action.employee)
      .then(function (updated) {
        self.setState({employee: updated});    
        notifications.success('Employee : ' + updated.username + ', updated.');
      })
      .catch(function (x) {
        notifications.error('There was an error updating employee.');
      });
  },

  remove: function (payload) {
    var self = this;

    return data.remove('employees', payload.action.employee) 
      .then(function (removed) {
        self.setState({employee: removed});
        notifications.success('Employee : ' + employee.username + ', was deleted.');
      })
      .catch(function (x) {
        notifications.error('Error attempting to delete employee.');
      });
  },

  restore: function (payload) {
    var self = this;

    return data.restore('employees', payload.action.employee) 
      .then(function (restored) {
        self.setState({employee: restored});
        notifications.success('Employee : ' + employee.username + ', was deleted.');
      })
      .catch(function (x) {
        notifications.error('Error attempting to restore employee.');
      });
  },

  create: function (payload) {
    var self = this;

    return data.create('employees', payload.action.employee)
      .then(function (created) {
        self.setState({employee: created});
        notifications.success('Employee : ' + created.username + ', created.');
      })
      .catch(function (x) {
        notifications.error('There was an error creating employee.');
      });
  }
});

module.exports = EmployeeStore;