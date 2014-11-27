var dispatcher = require('../flux/flux.dispatcher');

var EmployeeActions = {

  LIST: 'LIST_EMPLOYEES',
  GET: 'GET_EMPLOYEE',
  CREATE: 'CREATE_EMPLOYEE',
  UPDATE: 'UPDATE_EMPLOYEE',
  DELETE: 'DELETE_EMPLOYEE',
  RESTORE: 'RESTORE_EMPLOYEE',

  listEmployees: function () {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.LIST
    });
  },

  getEmployee: function (id) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.GET,
      employee: {_id: id}
    });
  },

  createEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.CREATE,
      employee: employee
    });
  },

  updateEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.UPDATE,
      employee: employee
    });
  },

  deleteEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.DELETE,
      employee: employee
    });
  },

  restoreEmployee: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.RESTORE,
      employee: employee
    });
  }
};

module.exports = EmployeeActions;
