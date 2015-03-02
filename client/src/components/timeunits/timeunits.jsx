var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var TimeunitTable = require('./timeunit.table');

var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitStore = require('../../stores/timeunit.store');
var TimesheetStore = require('../../stores/timesheet.store');
var LoginStore = require('../../stores/login.store');

var Timeunits = React.createClass({

  mixins: [
    Router.Navigation
  ],

  store: TimeunitStore,

  requestTimeunits: TimeunitActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  logTime: function () {
    this.transitionTo('timesheets.detail.timeunits.create',
      {user_id: LoginStore.getUserId(), _id: this.props.timesheet._id});
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  onTimesheetChange: function () {
    this.requestTimeunits(this.props.timesheet);
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
    TimesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
    TimesheetStore.removeChangeListener(this.onTimesheetChange);
  },

  render: function () {
    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="column">
            <h4 className="ui pad-bottom pad-top hard">Time Units</h4>
          </div>
          <div className="column">
            <button type="button" className="ui right floated primary button"
              onClick={this.logTime}>Log Time</button>
          </div>
        </div>

        <div className="sixteen wide column">
          <TimeunitTable timeunits={this.state.timeunits} timesheet={this.props.timesheet}/>
        </div>
      </div>
    );
  }
});

module.exports = Timeunits;
