/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var notifications = require('../../services/notifications');
var data = require('../../data/data');
var yesNo = require('../../filters/boolean');

var EmployeeRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    if (this.props.employee.deleted) {
      notifications.error('You cannot edit a deleted employee.');
      return;
    }
    Router.transitionTo('employees.detail', this.props.employee);
  },

  remove: function remove (e) {
    var self = this;
    e.stopPropagation();

    data.remove('employees', this.props.employee) 
      .then(function () {
        notifications.success('Employee : ' + employee.username + ', was deleted.');
      })
      .catch(function (x) {
        this.props.employee.deleted = false;
        notifications.error('Error attempting to delete employee.');
      });
  },

  restore: function restore (e) {
    var self = this;
    e.stopPropagation();

    data.restore('employees', this.props.employee)
      .then(function (restored) {
        notifications.success('Employee was restored.');
      })
      .catch(function (x) {
        this.props.employee.deleted = true;
        notifications.error('Error restoring employee.');
      });
  },
  
  render: function () {
    var cx = React.addons.classSet;
    var employee = this.props.employee;

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
