var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/snackbar.actions');
var Q = require('q');

var SnackbarStore = _.extend(_.clone(Store), {

  initialize: function () {

    var events = {};
    events[actions.INFO]    = this.info;
    events[actions.SUCCESS] = this.success;
    events[actions.ERROR]   = this.error;
    events[actions.RESET]   = this.newMessage;
    events[actions.HIDE]    = this.hide
    this.register(events);

    return this;
  },

  info: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });

    return Q();
  },

  error: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });

    return Q();
  },

  success: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });

    return Q();
  },

  reset: function () {


    return Q();
  },

  hide: function () {
    this.setState({
      message: ''
    });

    return Q();
  }

});

module.exports = SnackbarStore.initialize();
