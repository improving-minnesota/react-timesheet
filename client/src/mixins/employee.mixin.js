var EmployeeStore = require('../stores/employee.store');

module.exports = {

  store: EmployeeStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.employee[field] = value;
    this.state.errors[field] = this.validator[field](value);
    return this.setState({employee: this.state.employee, errors: this.state.errors});
  },

  hasErrors: function () {
    var errors = this.state.errors;
    return !!(errors.username || errors.email || errors.firstName || errors.lastName);
  },

  validator : {
    // username min 1 max 40
    username: function (value) {

    },

    email: function (value) {

    },

    firstName: function (value) {

    },

    lastName: function (value) {

    }
    // email
    // firstName min 1
    // lastName min 1
  },

  toggleAdmin: function () {
    var employee = this.state.employee;
    employee.admin = !employee.admin;
    this.setState({employee: employee});
  }
};
