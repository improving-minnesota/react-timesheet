var dispatcher = require('../flux/flux.dispatcher');

var TimeunitActions = {

  LIST: 'LIST_TIMEUNITS',
  GET: 'GET_TIMEUNIT',
  CREATE: 'CREATE_TIMEUNIT',
  UPDATE: 'UPDATE_TIMEUNIT',
  DELETE: 'DELETE_TIMEUNIT',
  RESTORE: 'RESTORE_TIMEUNIT',

  list: function () {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.LIST
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.GET,
      timeunit: {_id: id}
    });
  },

  create: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.CREATE,
      timeunit: timeunit
    });
  },

  update: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.UPDATE,
      timeunit: timeunit
    });
  },

  remove: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.DELETE,
      timeunit: timeunit
    });
  },

  restore: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.RESTORE,
      timeunit: timeunit
    });
  }
};

module.exports = TimeunitActions;
