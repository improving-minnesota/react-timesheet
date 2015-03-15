var React = require('react/addons');
var EmployeeRow = require('./employee.row');

var EmployeeTable = React.createClass({

  propTypes: {
    employees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    store: React.PropTypes.object
  },

  render: function () {
    var store = this.props.store;

    var employeeRows = this.props.employees.map(function (employee) {
      return (
        <EmployeeRow employee={employee} key={employee._id} store={store}/>
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
            <th className="tsz-table-delete-column">Delete</th>
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
