/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var notifications = require('../../services/notifications');
var yesNo = require('../../filters/boolean');
var actions = require('../../actions/employee.actions');

var EmployeeRow = React.createClass({

  getInitialState: function () {
    return {
      employee: this.props.employee
    };
  },

  showDetail: function showDetail () {
    if (this.props.employee.deleted) {
      notifications.error('You cannot edit a deleted employee.');
      return;
    }
    Router.transitionTo('employees.detail', this.state.employee);
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.state.employee.deleted = true;
    actions.deleteEmployee(this.state.employee);
    this.render();
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.state.employee.deleted = false;
    actions.restoreEmployee(this.state.employee);
    this.render();
  },
  
  render: function () {
    var cx = React.addons.classSet;
    var employee = this.state.employee;

    var classNames = cx({
      'repeated-item': true,
      'fadeable-row': true,
      'faded': employee.deleted
    });

    var buttonClasses = cx({
      'btn': true,
      'btn-sm': true,
      'btn-default': employee.deleted,
      'btn-danger': !employee.deleted
    });

    return (
      <tr className={classNames} onClick={this.showDetail}>

        <td>{employee.username}</td>
        <td>{employee.email}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{yesNo(employee.admin)}</td>
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
