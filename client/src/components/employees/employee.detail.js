var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

var EmployeeForm = require('./employee.form');
var EmployeeActions = require('../../actions/employee.actions');

var ChangeMixin = require('../../mixins/change.mixin');
var EmployeeMixin = require('../../mixins/employee.mixin');

var EmployeeDetail = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ChangeMixin,
    EmployeeMixin
  ],

  saveEmployee: function (event) {
    event.preventDefault();
    EmployeeActions.update(this.state.employee);
    this.goBack();
  },

  get: function (employeeId) {
    var employee = this.store.getState().employee;
    if (_.isEmpty(employee)) {
      EmployeeActions.get(employeeId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      employee: {},
      errors: {}
    };
  },

  componentDidMount: function () {
    this.get(this.getParams()._id);
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

module.exports = EmployeeDetail;
