var React = require('react/addons');
var Router = require('react-router');

var EmployeeForm = require('./employee.form');
var EmployeeActions = require('../../actions/employee.actions');
var EmployeeMixin = require('../../mixins/employee.mixin');

var EmployeeCreate = React.createClass({

  mixins : [
    Router.Navigation,
    EmployeeMixin
  ],

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

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
    this.transitionTo('employees');
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
