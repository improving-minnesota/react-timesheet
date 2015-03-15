var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var TimeunitTable = require('./timeunit.table');

var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitStore = require('../../stores/timeunit.store');
var TimesheetStore = require('../../stores/timesheet.store');
var LoginStore = require('../../stores/login.store');

var Timeunits = React.createClass({

  propTypes: {
    timesheet: React.PropTypes.object.isRequired
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  requestTimeunits: TimeunitActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  logTime: function () {
    this.transitionTo('timesheets.detail.timeunits.create', {
      user_id: this.getParams().user_id,
      _id: this.getParams()._id,
      timeunit_id: this.getParams().timeunit_id
    });
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  onTimesheetChange: function () {
    this.requestTimeunits(this.props.timesheet);
  },

  componentWillMount: function () {
    this.requestTimeunits(this.props.timesheet);
    this.store.addChangeListener(this.onChange);
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
    this.timesheetStore.removeChangeListener(this.onTimesheetChange);
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
          <TimeunitTable timeunits={this.state.timeunits} 
            timesheet={this.props.timesheet}
            store={this.store}/>
        </div>
      </div>
    );
  }
});

module.exports = Timeunits;
