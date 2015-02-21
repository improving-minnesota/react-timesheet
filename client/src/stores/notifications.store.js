var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/notifications.actions');

var NotificationsStore = _.extend(_.clone(Store), {

  initialize: function () {

    var events = {};
    events[actions.INFO] = this.info;
    events[actions.SUCCESS] = this.success;
    events[actions.ERROR] = this.error;
    this.register(events);

    this.setState({
      message: '',
      type: ''
    });
  },

  info: function (payload) {
    this.setState({
      message: payload.action.message,
      type: actions.INFO
    });
  },

  error: function (payload) {
    this.setState({
      message: payload.action.message,
      type: actions.ERROR
    });
  },

  success: function (payload) {
    this.setState({
      message: payload.action.message,
      type: actions.SUCCESS
    });
  }
});

module.exports = NotificationsStore.initialize();
