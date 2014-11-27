/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var EmployeeForm = require('./employee.form');
var EmployeeActions = require('../../actions/employee.actions');

var ChangeMixin = require('../../mixins/change.mixin');
var EmployeeMixin = require('../../mixins/employee.mixin');

var EmployeeDetail = React.createClass({

  mixins: [
    ChangeMixin,
    EmployeeMixin
  ],

  saveEmployee: function (event) {
    EmployeeActions.update(this.state.employee);
    this.goToEmployeesTable();
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
      section: 'Update Employee',
      employee: {}
    };
  },

  componentDidMount: function () {
    this.get(this.props.params._id);
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        onCancel={this.goToEmployeesTable}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
});

module.exports = EmployeeDetail;
