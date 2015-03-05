var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/snackbar.actions');
var Q = require('q');

var SnackbarStore = _.extend(_.clone(Store), {

  currentTimeout: null,

  initialize: function () {

    var events = {};
    events[actions.INFO]    = this.info;
    events[actions.SUCCESS] = this.success;
    events[actions.ERROR]   = this.error;
    events[actions.HIDE]    = this.hide;
    this.register(events);

    return this;
  },

  info: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });
    this.reset();

    return Q();
  },

  error: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });
    this.reset();

    return Q();
  },

  success: function (payload) {
    this.setState({
      message: payload.action.message,
      messageType: payload.action.actionType
    });
    this.reset();

    return Q();
  },

  reset: function () {
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = window.setTimeout(
      function () {
        actions.hide();
      },
      3000
    );
  },

  hide: function () {
    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = null;

    this.setState({
      message: ''
    });

    return Q();
  }

});

module.exports = SnackbarStore.initialize();
