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

  remove: function remove (e) {
    e.stopPropagation();
    this.props.employee.deleted = true;
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.employee.deleted = false;
  },

  render: function () {
    var employee = this.props.employee;

    var classNames = this.getClass('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
      'positive': employee.deleted,
      'negative': !employee.deleted
    });

    return (
      <tr className={classNames} ref={employee._id}>

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
