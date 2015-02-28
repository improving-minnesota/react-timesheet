var React = require('react/addons');
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
      },
      errors: {}
    };
  },

  saveEmployee: function (event) {
    event.preventDefault();
    EmployeeActions.create(this.state.employee);
    this.goBack();
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
});

module.exports = EmployeeCreate;
