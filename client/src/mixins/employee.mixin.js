var EmployeeStore = require('../stores/employee.store');

module.exports = {

  store: EmployeeStore,

  validate: function (event) {
    this.state.employee[event.target.name] = event.target.value;
    this.setState(this.state.employee);
  },

  toggleAdmin: function () {
    var employee = this.state.employee;
    employee.admin = !employee.admin;
    this.setState({employee: employee});
  }
};
