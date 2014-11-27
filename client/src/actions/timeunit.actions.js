var dispatcher = require('../flux/flux.dispatcher');

var TimeunitActions = {

  LIST: 'LIST_TIMEUNITS',
  GET: 'GET_TIMEUNIT',
  CREATE: 'CREATE_TIMEUNIT',
  UPDATE: 'UPDATE_TIMEUNIT',
  DELETE: 'DELETE_TIMEUNIT',
  RESTORE: 'RESTORE_TIMEUNIT',

  listTimeunits: function () {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.LIST
    });
  },

  getTimeunit: function (id) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.GET,
      timeunit: {_id: id}
    });
  },

  createTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.CREATE,
      timeunit: timeunit
    });
  },

  updateTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.UPDATE,
      timeunit: timeunit
    });
  },

  deleteTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.DELETE,
      timeunit: timeunit
    });
  },

  restoreTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.RESTORE,
      timeunit: timeunit
    });
  }
};

module.exports = TimeunitActions;
