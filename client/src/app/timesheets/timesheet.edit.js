/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimesheetForm = require('./timesheet.form');

var TimesheetEdit = React.createClass({

  getInitialState: function () {
    return {
      saveText: 'Update'
    };
  },

  getTimesheet: function () {

  },

  saveTimesheet: function () {

  },

  cancel: function () {
    Router.transistionTo('timesheets');
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet} />
    );
  }
});

module.exports = TimesheetEdit;