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

  // TODO - replace these with actual implementations
  getInitialState: function () {
    return {pageConfig: {data: [{}], totalItems: 0}};
  },
  store: null,
  onPageChange: null,
  // ERASE THE ABOVE LINES


  render: function () {

    var numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    var pagesShown = Math.min(numPages, 5);

    return (
      <div>
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
