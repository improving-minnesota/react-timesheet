/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router');

var EmployeeForm = require('./employee.form');
var data = require('../../data/data');

var EmployeeCreate = React.createClass({

  getInitialState: function () {
    return {
      saveText: 'Create',
      employee: {admin: false}
    };
  },

  saveEmployee: function () {
    data.create('employees', this.state.employee)
      .then(function (created) {
        notifications.success('Employee : ' + created.username + ', created.');
        Router.transitionTo('employees');
      })
      .catch(function (x) {
        notifications.error('There was an error creating employee.');
      });
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