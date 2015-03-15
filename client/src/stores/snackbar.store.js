var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/snackbar.actions');
var Promise = require('es6-promise').Promise;
var assign = require('object-assign');

var SnackbarStore = assign({}, Store, {

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
    var self = this;

    return new Promise(function (resolve) {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
      resolve();
    });
  },

  error: function (payload) {
    var self = this;

    return new Promise(function (resolve) {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
      resolve();
    });
  },

  success: function (payload) {
    var self = this;

    return new Promise(function (resolve) {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
      resolve();
    });
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
    var self = this;

    return new Promise(function (resolve) {
      window.clearTimeout(self.currentTimeout);
      self.currentTimeout = null;


      self.setState({
        message: ''
      });

      resolve();
    });
  }

});

module.exports = SnackbarStore.initialize();
