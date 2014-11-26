var constants = require('../flux/flux.constants');
var dispatcher = require('../flux/flux.dispatcher');

var TimeunitActions = {

  listTimeunits: function () {
    dispatcher.handleViewAction({
      actionType: constants.LIST_TIMEUNITS
    });
  },

  getTimeunit: function (id) {
    dispatcher.handleViewAction({
      actionType: constants.GET_TIMEUNIT,
      timeunit: {_id: id}
    });
  },

  createTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: constants.CREATE_TIMEUNIT,
      timeunit: timeunit
    });
  },

  updateTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: constants.UPDATE_TIMEUNIT,
      timeunit: timeunit
    });
  },

  deleteTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: constants.DELETE_TIMEUNIT,
      timeunit: timeunit
    });
  },

  restoreTimeunit: function (timeunit) {
    dispatcher.handleViewAction({
      actionType: constants.RESTORE_TIMEUNIT,
      timeunit: timeunit
    });
  }
};

module.exports = TimeunitActions;
