var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classnames');

// var EmployeeActions = require('../../actions/employee.actions');

var EmployeeRow = React.createClass({

  propTypes: {
    employee: React.PropTypes.object,
    store: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  remove: function remove (e) {
    e.stopPropagation();
    this.props.employee.deleted = true;
    // TODO - fire an action to remove the employee
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.employee.deleted = false;
    // TODO - fire an action to restore the employee
  },

  render: function () {
    var employee = this.props.employee;

    var rowClasses = classNames('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    var buttonClasses = classNames('ui primary button small', {
      'positive': employee.deleted,
      'negative': !employee.deleted
    });

    return (
      <tr className={rowClasses} ref={employee._id}>
        <td>{employee.username}</td>
        <td>{employee.email}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.admin ? 'Yes' : 'No'}</td>
        <td>
          <button className={buttonClasses} onClick={employee.deleted ? this.restore : this.remove}>
            {employee.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = EmployeeRow;
