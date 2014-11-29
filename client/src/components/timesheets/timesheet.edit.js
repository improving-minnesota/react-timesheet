/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var TimesheetForm = require('./timesheet.form');
var TimesheetActions = require('../../actions/timesheet.actions');

var ChangeMixin = require('../../mixins/change.mixin');
var TimesheetMixin = require('../../mixins/timesheet.mixin');

var TimesheetEdit = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ChangeMixin,
    TimesheetMixin
  ],

  saveTimesheet: function (event) {
    TimesheetActions.update(this.state.timesheet);
    this.goToTimesheetsTable();
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
      section: 'Update Timesheet',
      timesheet: {}
    };
  },

  componentDidMount: function () {
    this.get(this.getParams()._id);
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet}
        saveText={this.state.saveText}
        onSave={this.saveTimesheet}
        onCancel={this.gotToTimesheetsTable}
        validate={this.validate}/>
    );
  }
});

module.exports = TimesheetEdit;
