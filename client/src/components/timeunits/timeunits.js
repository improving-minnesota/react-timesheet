/** @jsx React.DOM */

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
    TimesheetStore.addChangeListener(this.onTimesheetChange);
  },

  render: function () {
    return (
      <div>
        <div tsz-form-section-header header="Time Units">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-8 pull-right">
              <button type="button" className="btn btn-primary btn-block"
                onClick={this.logTime}>Log Time</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="tsz-responsive-table-container">
              <TimeunitTable timeunits={this.state.timeunits} timesheet={this.props.timesheet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Timeunits;
