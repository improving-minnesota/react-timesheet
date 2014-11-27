var dispatcher = require('../flux/flux.dispatcher');

var TimesheetActions = {

  LIST: 'LIST_TIMESHEETS',
  GET: 'GET_TIMESHEET',
  CREATE: 'CREATE_TIMESHEET',
  UPDATE: 'UPDATE_TIMESHEET',
  DELETE: 'DELETE_TIMESHEET',
  RESTORE: 'RESTORE_TIMESHEET',

  listTimesheets: function () {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.LIST
    });
  },

  getTimesheet: function (id) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.GET,
      timesheet: {_id: id}
    });
  },

  createTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.CREATE,
      timesheet: timesheet
    });
  },

  updateTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.UPDATE,
      timesheet: timesheet
    });
  },

  deleteTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.DELETE,
      timesheet: timesheet
    });
  },

  restoreTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.RESTORE,
      timesheet: timesheet
    });
  }
};

module.exports = TimesheetActions;
