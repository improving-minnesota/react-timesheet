var dispatcher = require('../flux/flux.dispatcher');

var TimesheetActions = {

  LIST: 'LIST_TIMESHEETS',
  GET: 'GET_TIMESHEET',
  CREATE: 'CREATE_TIMESHEET',
  UPDATE: 'UPDATE_TIMESHEET',
  DELETE: 'DELETE_TIMESHEET',
  RESTORE: 'RESTORE_TIMESHEET',

  list: function (query) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.LIST,
      query: query
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.GET,
      timesheet: {_id: id}
    });
  },

  create: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.CREATE,
      timesheet: timesheet
    });
  },

  update: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.UPDATE,
      timesheet: timesheet
    });
  },

  remove: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.DELETE,
      timesheet: timesheet
    });
  },

  restore: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.RESTORE,
      timesheet: timesheet
    });
  }
};

module.exports = TimesheetActions;
