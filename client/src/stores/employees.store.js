var merge = require('react/lib/merge');

var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var data = require('../data/data');
var notifications = require('../services/notifications');

var EmployeesStore = merge(store.prototype, {
  
  initialize: function () {
    var config = {};
    config[constants.LIST_EMPLOYEES] = this.list;

    this.register(config);
    return this;
  },

  list: function () {
    var self = this;

    data.list('employees')
      .then(function (employees) {
        self.setState({employees: employees});
      })
      .catch(function (x) {
        notifications.error('Error attempting to retrieve employees.');
      });
  }
});

module.exports = EmployeesStore;