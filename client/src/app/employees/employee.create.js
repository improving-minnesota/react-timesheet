/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var EmployeeForm = require('./employee.form');
var actions = require('../../actions/employee.actions');
var EmployeeStore = require('../../stores/employee.store');

var EmployeeCreate = React.createClass({

  store: EmployeeStore.initialize(),

  getInitialState: function () {
    return {
      saveText: 'Create',
      section: 'Create Employee'
    };
  },

  onChange: function () {
    this.setState(this.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  saveEmployee: function () {
    actions.createEmployee(this.state.employee);
  },

  cancel: function () {
    Router.transitionTo('employees');
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee || {}} saveText={this.state.saveText} onSave={this.saveEmployee} onCancel={this.cancel}/>
    );
  }
});

module.exports = EmployeeCreate; 