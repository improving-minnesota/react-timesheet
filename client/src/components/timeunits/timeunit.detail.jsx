var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');
var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitMixin = require('../../mixins/timeunit.mixin');
var TimesheetActions = require('../../actions/timesheet.actions');

var TimeunitEdit = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    TimeunitMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Update',
      timeunit: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  onTimesheetChange: function () {
    this.setState({timesheet: this.timesheetStore.getState().timesheet});
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentDidMount: function () {
    this.getTimesheet(this.getParams()._id);
    this.get(this.getParams()._id, this.getParams().timeunit_id);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
    this.timesheetStore.removeChangeListener(this.onTimesheetChange);
  },

  get: function (timesheetId, timeunitId) {
    var timeunit = this.store.getState().timeunit;
    if (!timeunit._id) {
      TimeunitActions.get({_id: timesheetId}, timeunitId);
    }
    else {
      this.onChange();
    }
  },

  getTimesheet: function (timesheetId) {
    var timesheet = this.timesheetStore.getState().timesheet;
    if (!timesheet._id) {
      TimesheetActions.get(timesheetId);
    }
    else {
      this.onTimesheetChange();
    }
  },

  saveTimeunit: function (e) {
    e.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimeunitActions.update(this.state.timesheet, this.state.timeunit);
      this.transitionTo('timesheets.detail', {
        user_id: this.getParams().user_id,
        _id: this.getParams()._id
      });
    }
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.state.timeunit}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveTimeunit}
        validate={this.validate}
        validateProject={this.validateProject}
        validateDateWorked={this.validateDateWorked} />
    );
  }
});

module.exports = TimeunitEdit;
