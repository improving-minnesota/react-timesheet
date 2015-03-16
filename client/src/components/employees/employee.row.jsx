var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var EmployeeRow = React.createClass({

  propTypes: {
    employee: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    Router.State,
    classes
  ],

  render: function () {
    var employee = this.props.employee;

    var classNames = this.getClass('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    return (
      <tr className={classNames} ref={employee._id}>
        <td>{employee.username}</td>
        <td>{employee.email}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.admin ? 'Yes' : 'No'}</td>
      </tr>
    );
  }
});

module.exports = EmployeeRow;
