var store = require('../flux/flux.store');
var constants = require('../flux/flux.constants');
var merge = require('react/lib/merge');

var EmployeesStore = merge(store.prototype, {
  
  initialize: function () {
    this.employees = [];

    this.bindActions(
      constants.LIST_EMPLOYEES, this.list
    );
  },

  list: function () {

    this.emit('change');
  },

  getState: function () {
    return {
      employees: this.employees
    };
  }

});

module.exports = EmployeesStore;