/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimesheetForm = require('./timesheet.form');

var TimesheetCreate = React.createClass({

  getInitialState: function () {
    return {
      saveText: 'Create',
      timesheet: {}
    };
  },

  saveTimesheet: function () {

  },

  cancel: function () {

  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet} />
    );
  }
});

module.exports = TimesheetCreate;