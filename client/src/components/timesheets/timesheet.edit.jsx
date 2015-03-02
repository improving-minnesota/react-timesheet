var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var TimesheetForm = require('./timesheet.form');
var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetMixin = require('../../mixins/timesheet.mixin');

var TimesheetEdit = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    TimesheetMixin
  ],

  saveTimesheet: function (event) {
    event.preventDefault();
    TimesheetActions.update(this.state.timesheet);
    this.goBack();
  },

  get: function (timesheetId) {
    var timesheet = this.store.getState().timesheet;
    if (_.isEmpty(timesheet)) {
      TimesheetActions.get(timesheetId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      timesheet: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.get(this.getParams()._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveTimesheet}
        validate={this.validate}/>
    );
  }
});

module.exports = TimesheetEdit;
