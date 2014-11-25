var Router = require('react-router');
var EmployeeStore = require('../stores/employee.store');

module.exports = {

  store: EmployeeStore.initialize(),

  goToEmployeesTable: function () {
    Router.transitionTo('employees');
  },

  toggleAdmin: function () {
    var employee = this.state.employee;
    employee.admin = !employee.admin;
    this.setState({employee: employee});
  }
};
