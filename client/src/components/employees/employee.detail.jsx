var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var EmployeeForm = require('./employee.form');
var EmployeeActions = require('../../actions/employee.actions');
var EmployeeMixin = require('../../mixins/employee.mixin');

var EmployeeDetail = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    EmployeeMixin
  ],

  saveEmployee: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.update(this.state.employee);
      this.transitionTo('employees');
    }
  },

  get: function () {
    var employee = this.store.getState().employee;
    if (_.isEmpty(employee)) {
      var employeeId = this.getParams()._id;
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

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  componentDidMount: function () {
    this.get();
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
});

module.exports = EmployeeDetail;
