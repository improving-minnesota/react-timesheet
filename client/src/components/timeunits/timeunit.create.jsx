var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');
var TimeunitMixin = require('../../mixins/timeunit.mixin');
var TimeunitActions = require('../../actions/timeunit.actions');
var TimesheetActions = require('../../actions/timesheet.actions');

var TimeunitCreate = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    TimeunitMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Save',
      timeunit: {},
      errors: {}
    };
  },

  saveTimeunit: function (e) {
    e.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimeunitActions.create(this.state.timesheet, this.state.timeunit);
      this.transitionTo('timesheets.detail', {
        user_id: this.getParams().user_id,
        _id: this.getParams()._id
      });
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

  onTimesheetChange: function () {
    this.setState({timesheet: this.timesheetStore.getState().timesheet});
  },

  componentWillMount: function () {
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentDidMount: function () {
    this.getTimesheet(this.getParams()._id);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onTimesheetChange);
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

module.exports = TimeunitCreate;
