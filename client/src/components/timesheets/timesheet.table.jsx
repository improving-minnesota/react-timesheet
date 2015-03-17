var React = require('react/addons');
var TimesheetRow = require('./timesheet.row');

var TimesheetTable = React.createClass({

  propTypes: {
    timesheets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render: function () {
    var key = 1;

    var timesheetRows = this.props.timesheets.map(function (timesheet) {
      return (
        <TimesheetRow timesheet={timesheet} key={++key} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Begin Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {timesheetRows}
        </tbody>
      </table>
    );
  }
});

module.exports = TimesheetTable;
