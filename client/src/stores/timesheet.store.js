var _ = require('lodash');
var Store = require('../flux/flux.store');
var actions = require('../actions/timesheet.actions');
var axios = require('axios');
var assign = require('object-assign');

var TimesheetStore = assign({}, Store, {
  // TODO - replace with actual implementation
  initialize: _.noop
});

module.exports = TimesheetStore.initialize();
