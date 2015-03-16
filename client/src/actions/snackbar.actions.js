var dispatcher = require('../flux/flux.dispatcher');

var SnackbarActions = {

  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  NEW: 'new',
  HIDE: 'hide',

  error: function (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.ERROR,
      message: message
    });
  },

  success: function (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.SUCCESS,
      message: message
    });
  },

  info: function (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.INFO,
      message: message
    });
  },

  new: function () {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.NEW
    });
  },

  hide: function () {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.HIDE
    });
  }
};

module.exports = SnackbarActions;
