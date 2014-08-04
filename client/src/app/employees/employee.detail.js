/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var EmployeeForm = require('./employee.form');
var data = require('../../data/data');

var EmployeeDetail = React.createClass({

  getEmployee: function () {
    var self = this;

    data.get('employees', {_id: this.props.params._id})
      .then(function (employee) {
        self.setState({employee: employee});
      })
      .catch(function (data) {
        notifications.error('There was an error getting the employee');
      });
  },

  saveEmployee: function () {
    data.update('employees', this.state.employee)
      .then(function (updated) {
        notifications.success('Employee : ' + updated.username + ', updated.');
        Router.transitionTo('employees');
      })
      .catch(function (x) {
        notifications.error('There was an error creating employee.');
      });
  },

  cancel: function () {
    Router.transitionTo('employees');
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      section: 'Update Employee',
      employee: {admin: false}
    };
  },  

  componentDidMount: function() {
    this.getEmployee();
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee} saveText={this.state.saveText} onSave={this.saveEmployee} onCancel={this.cancel}/>
    );
  }
});

module.exports = EmployeeDetail; 

