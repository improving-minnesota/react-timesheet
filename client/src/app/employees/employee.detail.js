/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var EmployeeForm = require('./employee.form');
var data = require('../../data/data');

var EmployeeDetail = React.createClass({

  mixins: [
    FluxChildMixin(React),
    StoreWatchMixin('employee.store')
  ],

  saveEmployee: function () {
    this.getFlux().actions().employees.update(this.state.employee);
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

  getStateFromFlux: function () {
    return this.getFlux().stores('employee').getState();
  },

  componentDidMount: function() {
    this.getFlux().actions.employees.get();
  },
  
  render : function () {
    return (
      <EmployeeForm employee={this.state.employee} saveText={this.state.saveText} onSave={this.saveEmployee} onCancel={this.cancel}/>
    );
  }
});

module.exports = EmployeeDetail; 

