var dispatcher = require('../flux/flux.dispatcher');

var EmployeeActions = {

  LIST: 'LIST_EMPLOYEES',
  GET: 'GET_EMPLOYEE',
  CREATE: 'CREATE_EMPLOYEE',
  UPDATE: 'UPDATE_EMPLOYEE',
  DELETE: 'DELETE_EMPLOYEE',
  RESTORE: 'RESTORE_EMPLOYEE',

  list: function (query) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.LIST,
      query: query
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.GET,
      employee: {_id: id}
    });
  },

  create: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.CREATE,
      employee: employee
    });
  },

  update: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.UPDATE,
      employee: employee
    });
  },

  remove: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.DELETE,
      employee: employee
    });
  },

  restore: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.RESTORE,
      employee: employee
    });
  }
};

module.exports = EmployeeActions;
