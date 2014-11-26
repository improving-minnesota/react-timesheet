var constants = require('../flux/flux.constants');
var dispatcher = require('../flux/flux.dispatcher');

var TimesheetActions = {

  listTimesheets: function () {
    dispatcher.handleViewAction({
      actionType: constants.LIST_TIMESHEETS
    });
  },

  getTimesheet: function (id) {
    dispatcher.handleViewAction({
      actionType: constants.GET_TIMESHEET,
      timesheet: {_id: id}
    });
  },

  createTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: constants.CREATE_TIMESHEET,
      timesheet: timesheet
    });
  },

  updateTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: constants.UPDATE_TIMESHEET,
      timesheet: timesheet
    });
  },

  deleteTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: constants.DELETE_TIMESHEET,
      timesheet: timesheet
    });
  },

  restoreTimesheet: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: constants.RESTORE_TIMESHEET,
      timesheet: timesheet
    });
  }
};

module.exports = TimesheetActions;
