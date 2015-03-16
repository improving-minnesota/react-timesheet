var React = require('react/addons');
var EmployeeRow = require('./employee.row');

var EmployeeTable = React.createClass({

  propTypes: {
    employees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render: function () {
    var key = 1;

    var employeeRows = this.props.employees.map(function (employee) {
      return (
        <EmployeeRow employee={employee} key={++key} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    );
  }
});

module.exports = EmployeeTable;
