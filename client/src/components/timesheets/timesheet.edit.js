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
        validate={this.validate}/>
    );
  }
});

module.exports = TimesheetEdit;
