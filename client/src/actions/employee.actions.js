var constants = require('../flux/flux.constants');
var dispatcher = require('../flux/flux.dispatcher');

var EmployeeActions = {

  listEmployees: function () {
    dispatcher.handleViewAction({
      actionType: constants.LIST_EMPLOYEES
    });
  },

  getEmployee: function (id) {
    dispatcher.handleViewAction({
      actionType: constants.GET_EMPLOYEE,
      employee: {id: id}
    });
  },

  createEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: constants.CREATE_EMPLOYEE,
      employee: employee
    });
  },

  updateEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: constants.UPDATE_EMPLOYEE,
      employee: employee
    });
  },

  deleteEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: constants.DELETE_EMPLOYEE,
      employee: employee
    });
  },

  restoreEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: constants.RESTORE_EMPLOYEE,
      employee: employee
    });
  }
};

module.exports = EmployeeActions;