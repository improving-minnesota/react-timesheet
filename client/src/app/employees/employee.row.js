/** @jsx React.DOM */

var React = require('react/addons');


var EmployeeRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    alert('show detail');
    // if (employee.deleted) {
    //   notifications.error('You cannot edit a deleted employee.');
    //   return;
    // }
    // Router.transitionTo('app.employees.detail', employee);
  },

  remove: function remove () {
    alert('remove!');
    // data.remove('employees', employee) 
    //   .then(function () {
    //     notifications.success('Employee : ' + employee.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     employee.deleted = false;
    //     notifications.error('Error attempting to delete employee.');
    //   });
// $event.stopPropagation();
  },

  restore: function restore () {
   alert('restore!');
   // data.restore('employees', employee)
   //    .then(function (restored) {
   //      notifications.success('Employee was restored.');
   //    })
   //    .catch(function (x) {
   //      employee.deleted = true;
   //      notifications.error('Error restoring employee.');
   //    });
// $event.stopPropagation();
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
        <td>{employee.admin}</td>
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
