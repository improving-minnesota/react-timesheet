var Router = require('react-router');
var TimesheetStore = require('../stores/timesheet.store');

module.exports = {

  store: TimesheetStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.timesheet[field] = value;
    this.state.errors[field] = this.validator[field].call(this, value);
    return this.setState({timesheet: this.state.timesheet, errors: this.state.errors});
  },

  validateAll: function () {
    this.state.errors.name = this.validator.name.call(this, this.state.timesheet.name);
    this.state.errors.description = this.validator.description.call(this, this.state.timesheet.description);
    this.state.errors.beginDate = this.validator.beginDate.call(this, this.state.timesheet.beginDate);
    this.state.errors.endDate = this.validator.endDate.call(this, this.state.timesheet.endDate);
    this.setState({errors: this.state.errors});
  },

  hasErrors: function () {
    var errors = this.state.errors;
    return !!(errors.name || errors.description || errors.beginDate || errors.endDate);
  },

  validateEndDate: function (date) {
    this.validate({target:{name: 'endDate', value: date}});
    this.validate({target:{name: 'beginDate', value: this.state.timesheet.beginDate}});
  },

  validateBeginDate: function (date) {
    this.validate({target:{name: 'beginDate', value: date}});
    this.validate({target: {name: 'endDate', value: this.state.timesheet.endDate}});
  },

  validator: {
    name: function (value) {
      // min length 1
      if (!value || value.length < 1) {
        return 'You must provide a name.';
      }
      // max length 40
      else if (value.length > 40) {
        return 'Name can only be 40 characters long.';
      }
      return null;
    },

    description: function (value) {
      // minlength 1
      if (!value || value.length < 1) {
        return 'You must provide a description.';
      }
      // maxlength 255
      else if (value.length > 255) {
        return 'Description can only be 255 characters long.';
      }
      return null;
    },

    beginDate: function (value) {
      var endDate = this.state.timesheet.endDate;

      if (value > endDate) {
        return 'Begin date must be before end date.';
      }
      return null;
    },

    endDate: function (value) {
      var beginDate = this.state.timesheet.beginDate;

      if (value < beginDate) {
        return 'End date must be after begin date.';
      }
      return null;
    }
  }
};
