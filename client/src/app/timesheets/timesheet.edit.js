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

  save: function () {
    
  },

  cancel: function () {
    Router.transistionTo('timesheets');
  },

  componentDidMount: function () {
    
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet} save={this.save} cancel={this.cancel} />
    );
  }
});

module.exports = TimesheetEdit;