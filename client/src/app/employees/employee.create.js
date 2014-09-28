/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var EmployeeForm = require('./employee.form');

var EmployeeCreate = React.createClass({

  mixins: [
    FluxChildMixin(React), 
    StoreWatchMixin('employee')
  ],

  getInitialState: function () {
    return {
      saveText: 'Create'
    };
  },

  saveEmployee: function () {
    return {
      employee: this.getFlux().stores('employee').employee
    };
  },

  cancel: function () {
    Router.transitionTo('employees');
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee} saveText={this.state.saveText} onSave={this.saveEmployee} onCancel={this.cancel}/>
    );
  }
});

module.exports = EmployeeCreate; 