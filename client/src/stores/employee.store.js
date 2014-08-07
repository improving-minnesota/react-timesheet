var Fluxxor = require('fluxxor');
var constants = require('../flux/flux.constants');

var employees = require('../../../api/data/users.json');

var EmployeeStore = Fluxxor.createStore({
  
  actions: {
    constants.UPDATE_EMPLOYEE: 'update',
    constants.DELETE_EMPLOYEE: 'remove',
    constants.CREATE_EMPLOYEE: 'create'
  },

  initialize: function () {
    this.employees = [];
  },

  update: function (employee) {

    this.emit('change');
  },

  remove: function (employee) {


    this.emit('change');
  },

  create: function (create) {


    this.emit('change');
  },

  getState: function () {
    return {
      employees: employees;
    };
  }

});

module.exports = EmployeeStore;