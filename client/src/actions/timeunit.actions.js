var dispatcher = require('../flux/flux.dispatcher');

var TimeunitActions = {

  LIST: 'LIST_TIMEUNITS',
  GET: 'GET_TIMEUNIT',
  CREATE: 'CREATE_TIMEUNIT',
  UPDATE: 'UPDATE_TIMEUNIT',
  DELETE: 'DELETE_TIMEUNIT',
  RESTORE: 'RESTORE_TIMEUNIT',

  list: function (timesheet, query) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.LIST,
      timesheet: timesheet,
      query: query
    });
  },

  get: function (timesheet, id) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.GET,
      timeunit: {_id: id},
      timesheet: timesheet
    });
  },

  create: function (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.CREATE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  update: function (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.UPDATE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  remove: function (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.DELETE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  restore: function (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.RESTORE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  }
};

module.exports = TimeunitActions;
