var Router = require('react-router');
var TimeunitStore = require('../stores/timeunit.store');

module.exports = {

  store: TimeunitStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.timeunit[field] = value;
    this.state.errors[field] = this.validator[field](value);
    return this.setState({timeunit: this.state.timeunit, errors: this.state.errors});
  },

  hasErrors: function () {
    var errors = this.state.errors;
    return !!(errors.project || errors.dateWorked || errors.hoursWorked);
  },

  validator: {
    project: function (value) {
      // min length 1
      if (_.isUndefined(value)) {
        return 'You must select a project.';
      }

      return null;
    },

    dateWorked: function (value) {
      var timesheet = this.state.timesheet;

      if (!value) {
        return 'You must enter the date worked.';
      }
      else if (value < timesheet.beginDate) {
        return 'Date must be after the timesheet begin date.';
      }
      else if (value > timesheet.endDate) {
        return 'Date must be before the timesheet end date.';
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
