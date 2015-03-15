var React = require('react/addons');
var Router = require('react-router');

var TimesheetTable = require('./timesheet.table');
var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetStore = require('../../stores/timesheet.store');

var Paginator = require('../common/navigation/paginator');

var Timesheets = React.createClass({

  mixins: [
    Router.Navigation
  ],

  store: TimesheetStore,

  requestTimesheets: TimesheetActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  createNew: function () {
    return this.transitionTo('timesheets.create', {user_id: '123'});
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.requestTimesheets({page: 1});
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
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
            New Timesheet
          </button>
        </div>

        <div className="row">
          <TimesheetTable timesheets={this.state.pageConfig.data} store={this.store} />
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
