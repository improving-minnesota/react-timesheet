/** @jsx React.DOM */

var React = require('react/addons');
var TimeunitRow = require('./timeunits.row');

var TimeunitTable = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function () {
    
    var timeunitRows = this.props.timeunits.map(function (timeunit) {
      return (
        <TimeunitRow timeunit={timeunit} key={timeunit._id} />
      );
    });

    return (
      <table className="table table-bordered table-hover tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Begin Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Description</th>
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