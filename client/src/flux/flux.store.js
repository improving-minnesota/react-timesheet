var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');

var dispatcher = require('./flux.dispatcher');
var constants = require('./flux.constants');

var Store = merge(EventEmitter.prototype, {
  
  state: {},

  getState: function () {
    return state;
  },

  setState: function (state) {
    this.state = state;
  },

  emitChange: function () {
    this.emit(constants.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(constants.CHANGE_EVENT, callback);
  },

  register: function (config) {
    var self = this;

    dispatcher.register(function (payload) {
      var action = payload.action;
      var events = config;
      var callback = events[action.actionType];

      if (_.isDefined(callback)) {
        callback.apply(self, [payload]);
        self.emitChange();
      }
      return true;
    });
  }
});

module.exports = Store;