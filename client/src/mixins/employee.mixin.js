var Router = require('react-router');
var EmployeeStore = require('../stores/employee.store');

module.exports = {

  store: EmployeeStore,

  validate: function (event) {
    this.state.employee[event.target.name] = event.target.value;
    this.setState(this.state.employee);
  },

  goToEmployeesTable: function () {
    Router.transitionTo('employees');
  },

  toggleAdmin: function () {
    var employee = this.state.employee;
    employee.admin = !employee.admin;
    this.setState({employee: employee});
  }
};
