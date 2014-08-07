var Fluxxor = require('fluxxor');
var constants = require('../flux/flux.constants');

var timesheets = require('../../../api/data/user.timesheets.json');

var TimesheetStore = Fluxxor.createStore({
  
  actions: {
    constants.UPDATE_TIMESHEET: 'update',
    constants.DELETE_TIMESHEET: 'remove',
    constants.CREATE_TIMESHEET: 'create'
  },

  initialize: function () {
    this.timesheets = [];
  },

  update: function (employee) {

    this.emit('change');
  },

  remove: function (employee) {


    this.emit('change');
  },

  create: function (create) {


    this.emit('change');
  },

  getState: function () {
    return {
      timesheets: timesheets;
    };
  }

});

module.exports = TimesheetStore;