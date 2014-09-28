/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var TimesheetForm = require('./timesheet.form');

var TimesheetEdit = React.createClass({

  mixins: [
    FluxChildMixin(React),
    StoreWatchMixin('timesheets')
  ],

  getInitialState: function () {
    return {
      saveText: 'Update'
    };
  },

  getStateFromFlux: function () {
    return this.getFlux().stores('timesheet').getState();
  },

  save: function () {
    this.getFlux().actions.timesheets.update(this.state.timesheet);
  },

  cancel: function () {
    Router.transistionTo('timesheets');
  },

  componentDidMount: function () {
    this.getFlux().actions.timesheets.get(this.props.params._id);
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet} save={this.save} cancel={this.cancel} />
    );
  }
});

module.exports = TimesheetEdit;