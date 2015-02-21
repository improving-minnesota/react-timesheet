/*global window */
// var Messenger = require('messenger');
var _ = require('lodash');

function Notifications () {}

Notifications.prototype.message = function (message, config) {
  message.hideAfter = 3;

  if (!_.isUndefined(config) && _.isObject(config)) {
    message = _.extend(message, config);
  }

  // types : success, error, info
  // new Messenger().post(message);
};

Notifications.prototype.error = function (message, config) {
  this.message({message: message, type: 'error', id: 'error-message'}, config);
};

Notifications.prototype.success = function (message, config) {
  this.message({message: message, type: 'success', id: 'success-message'}, config);
};

Notifications.prototype.info = function (message, config) {
  this.message({message: message, type: 'info', id: 'info-message'}, config);
};

module.exports = new Notifications();
