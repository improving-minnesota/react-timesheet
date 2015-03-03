var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/notifications.actions');
var Q = require('q');

var SnackbarStore = _.extend(Store, {

  initialize: function () {

    var events = {};
    events[actions.INFO]    = this.info;
    events[actions.SUCCESS] = this.success;
    events[actions.ERROR]   = this.error;
    this.register(events);

    return this;
  },

  info: function (payload) {
    this.setState({
      message: payload.action.message,
      level: payload.action.actionType
    });
    return Q(true);
  },

  error: function (payload) {
    this.setState({
      message: payload.action.message,
      level: payload.action.actionType
    });
    return Q(true);
  },

  success: function (payload) {
    this.setState({
      message: payload.action.message,
      level: payload.action.actionType
    });
    return Q(true);
  }
});

module.exports = SnackbarStore.initialize();
