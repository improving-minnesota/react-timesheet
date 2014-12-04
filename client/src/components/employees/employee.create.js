/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var EmployeeForm = require('./employee.form');
var EmployeeActions = require('../../actions/employee.actions');

var EmployeeMixin = require('../../mixins/employee.mixin');
var ChangeMixin = require('../../mixins/change.mixin');

var EmployeeCreate = React.createClass({

  mixins : [
    Router.Navigation,
    ChangeMixin,
    EmployeeMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      employee: {
        admin:false
      }
    };
  },

  saveEmployee: function (event) {
    EmployeeActions.create(this.state.employee);
    this.goToEmployeesTable();
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        onCancel={this.goBack}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
});

module.exports = EmployeeCreate;
