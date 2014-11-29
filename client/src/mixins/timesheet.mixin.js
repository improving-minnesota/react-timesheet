var Router = require('react-router');
var TimesheetStore = require('../stores/timesheet.store');

module.exports = {

  store: TimesheetStore,

  validate: function (event) {
    this.state.timesheet[event.target.name] = event.target.value;
    this.setState(this.state.timesheet);
  },

  goToTimesheetsTable: function () {
    this.transitionTo('timesheets');
  }
};
