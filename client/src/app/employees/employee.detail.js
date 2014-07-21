/** @jsx React.DOM */

var React = require('React');
var EmployeeForm = require('./employee.form.js');

var EmployeeDetail = React.createClass({

  getEmployee: function (employeeId) {
    // return data.get('employees', $stateParams);
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
    Router.transitionTo('app.employees');
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      section: 'Update Employee'
    };
  },  

  componentDidMount: function() {
    this.getEmployee();
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee} />
    );
  }
});

module.exports = EmployeeDetail; 

