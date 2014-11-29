/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetForm = require('./timesheet.form');

var TimesheetCreate = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      timesheet: {}
    };
  },

  save: function () {
    TimesheetActions.create(this.state.timesheet);
  },

  cancel: function () {
    this.transitionTo('timesheets');
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet} save={this.save} cancel={this.cancel} />
    );
  }
});

module.exports = TimesheetCreate;
