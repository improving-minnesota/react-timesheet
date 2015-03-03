var dispatcher = require('../flux/flux.dispatcher');

var NotificationsActions = {

  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',

  error: function (message) {
    dispatcher.handleViewAction({
      actionType: NotificationsActions.ERROR,
      message: message
    });
  },

  success: function (message) {
    dispatcher.handleViewAction({
      actionType: NotificationsActions.SUCCESS,
      message: message
    });
  },

  info: function (message) {
    dispatcher.handleViewAction({
      actionType: NotificationsActions.INFO,
      message: message
    });
  }
};

module.exports = NotificationsActions;
