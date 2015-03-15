var Store = require('../flux/flux.store');
var actions = require('../actions/employee.actions');
var axios = require('axios');
var assign = require('object-assign');
var _ = require('lodash');

var EmployeeStore = assign({}, Store, {
  // TODO - replace with actual implementation
  initialize: _.noop
});

module.exports = EmployeeStore.initialize();
