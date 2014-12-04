var dispatcher = require('../flux/flux.dispatcher');

var NotificationsActions = {

  ERROR: 'error_notification',
  SUCCESS: 'succes_notification',
  INFO: 'info_notification',

  error: function (message) {
    dispatcher.handleViewAction({
      actionType: this.ERROR,
      message: message
    });
  },

  success: function (message) {
    dispatcher.handleViewAction({
      actionType: this.SUCCESS,
      message: message
    });
  },

  info: function (message) {
    dispatcher.handleViewAction({
      actionType: this.INFO,
      message: message
    });
  }
};

module.exports = NotificationsActions;
