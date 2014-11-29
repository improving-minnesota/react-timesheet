/** @jsx React.DOM */

var React = require('react/addons');
var TimeunitRow = require('./timeunit.row');

var TimeunitTable = React.createClass({

  render: function () {
    var self = this;

    var timeunitRows = this.props.timeunits.map(function (timeunit) {
      return (
        <TimeunitRow timeunit={timeunit} key={timeunit._id} timesheet={self.props.timesheet}/>
      );
    });

    return (
      <table className="table table-bordered table-hover tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Project</th>
            <th>Date</th>
            <th>Hours</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {timeunitRows}
        </tbody>
      </table>
    );
  }
});

module.exports = TimeunitTable;
