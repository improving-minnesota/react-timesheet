var Router = require('react-router');
var TimeunitStore = require('../stores/timeunit.store');
var TimesheetStore = require('../stores/timesheet.store');
var ProjectStore = require('../stores/project.store');
var _ = require('lodash');

module.exports = {

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.timeunit[field] = value;
    this.state.errors[field] = this.validator[field].call(this, value);
    return this.setState({timeunit: this.state.timeunit, errors: this.state.errors});
  },

  validateAll: function () {
    this.state.errors.project = this.validator.project.call(this, this.state.timeunit.project);
    this.state.errors.dateWorked = this.validator.dateWorked.call(this, this.state.timeunit.dateWorked);
    this.state.errors.hoursWorked = this.validator.hoursWorked.call(this, this.state.timeunit.hoursWorked);
    this.setState({errors: this.state.errors});
  },

  validateProject: function (value) {
    this.validate.call(this, {target: {name: 'project', value: value}});
  },

  validateDateWorked: function (value) {
    this.validate.call(this, {target: {name: 'dateWorked', value: value}});
  },

  hasErrors: function () {
    var errors = this.state.errors;
    return !!(errors.project || errors.dateWorked || errors.hoursWorked);
  },

  validator: {
    project: function (value) {
      // min length 1
      if (!value) {
        return 'You must select a project.';
      }

      var project = _.find(ProjectStore.getState().projects, {name: value});
      this.state.timeunit.project = project.name;

      return null;
    },

    dateWorked: function (value) {
      var timesheet = this.state.timesheet;

      if (!value) {
        return 'You must enter the date worked.';
      }
      else if (value < timesheet.beginDate) {
        return 'Date must be after the timesheet begin date. ' + timesheet.beginDate;
      }
      else if (value > timesheet.endDate) {
        return 'Date must be before the timesheet end date. ' + timesheet.endDate;
      }
      return null;
    },

    hoursWorked: function (value) {
      if (value < 0) {
        return 'Negative numbers are not valid.';
      }
      return null;
    }
  }
};
