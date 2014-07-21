/** @jsx React.DOM */

var React = require('React');
var EmployeeForm = require('./employee.form');

var EmployeeCreate = React.createClass({

  getInitialState: function () {
    return {
      saveText: 'Create',
      employee: {admin: false}
    };
  },

  saveEmployee: function () {
    // data.create('employees', $scope.employee)
    //   .then(function (created) {
    //     notifications.success('Employee : ' + created.username + ', created.');
    //     Router.transitionTo('app.employees.detail', {_id: created._id});
    //   })
    //   .catch(function (x) {
    //     notifications.error('There was an error creating employee.');
    //   });
  },

  cancel: function () {
    // Router.transitionTo('app.employees', {}, {reload: true});
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee} />
    );
  }
});

module.exports = EmployeeCreate; 