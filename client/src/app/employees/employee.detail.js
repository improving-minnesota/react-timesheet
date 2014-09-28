/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var EmployeeForm = require('./employee.form');
var actions = require('../../actions/employee.actions');

var EmployeeDetail = React.createClass({

  saveEmployee: function () {
    actions.updateEmployee(this.props.employee);
  },

  cancel: function () {
    Router.transitionTo('employees');
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      section: 'Update Employee'
    };
  }, 
  
  render : function () {
    return (
      <EmployeeForm employee={this.props.employee} saveText={this.state.saveText} onSave={this.saveEmployee} onCancel={this.cancel}/>
    );
  }
});

module.exports = EmployeeDetail; 

