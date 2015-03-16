var React = require('react/addons');
var TimeunitRow = require('./timeunit.row');

var TimeunitTable = React.createClass({

  propTypes: {
    timeunits: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    store: React.PropTypes.object.isRequired
  },

  render: function () {
    var self = this;

    var timeunitRows = this.props.timeunits.map(function (timeunit) {
      return (
        <TimeunitRow timeunit={timeunit}
          key={timeunit._id}
          timesheet={self.props.timesheet}
          store={self.props.store} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
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
