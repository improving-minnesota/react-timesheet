/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitTable = require('./timeunit.table');
var ChangeMixin = require('../../mixins/change.mixin');

var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitStore = require('../../stores/timeunit.store');

var Timeunits = React.createClass({

  mixins: [
    ChangeMixin
  ],

  store: TimeunitStore,

  requestTimeunits: TimeunitActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  logTime: function () {
    Router.transitionTo('timesheets.detail.timeunits.create', {user_id: '123', _id: this.props.timesheet._id});
  },

  componentDidMount: function () {
    this.requestTimeunits(this.props.timesheet);
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
              <TimeunitTable timeunits={this.state.timesheet.timeunits} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Timeunits;
