var React = require('react/addons');
var Router = require('react-router');

var TimesheetTable = require('./timesheet.table');
var ChangeMixin = require('../../mixins/change.mixin');

var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetStore = require('../../stores/timesheet.store');
var Paginator = require('../common/paginator');

var Timesheets = React.createClass({

  mixins: [
    Router.Navigation,
    ChangeMixin
  ],

  store: TimesheetStore,

  requestTimesheets: TimesheetActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  createNew: function () {
    return this.transitionTo('timesheets.create', {user_id: '123'});
  },

  componentDidMount: function () {
    this.requestTimesheets({page: 1});
  },

  onPageChange: function (page) {
    this.requestTimesheets({page: page});
  },

  render: function () {

    var numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    var pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            <i className="icon-plus"/> New Timesheet
          </button>
        </div>

        <div className="row">
          <TimesheetTable timesheets={this.state.pageConfig.data} />
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Timesheets;
