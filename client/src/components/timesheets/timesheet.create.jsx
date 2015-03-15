var React = require('react/addons');
var Router = require('react-router');

var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetForm = require('./timesheet.form');
var TimesheetMixin = require('../../mixins/timesheet.mixin');

var TimesheetCreate = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    TimesheetMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      timesheet: {},
      errors: {}
    };
  },

  saveTimesheet: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.create(this.state.timesheet);
      this.transitionTo('timesheets', {user_id: this.getParams().user_id});
    }
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet}
        saveText={this.state.saveText}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        onSave={this.saveTimesheet}
        validate={this.validate}
        validateAll={this.validateAll}
        validateBeginDate={this.validateBeginDate}
        validateEndDate={this.validateEndDate}/>
    );
  }
});

module.exports = TimesheetCreate;
