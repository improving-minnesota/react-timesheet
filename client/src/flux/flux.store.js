var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');

var dispatcher = require('./flux.dispatcher');
var CHANGE_EVENT = 'CHANGE_EVENT';

var Store = assign({}, EventEmitter.prototype, {

  // TODO - replace with actual implementations
  register: _.noop,
  setState: _.noop,
  getState: function () { return {pageConfig: {data: [], totalItems: 0}};},
  addChangeListener: _.noop,
  removeChangeListener: _.noop
});

module.exports = Store;
