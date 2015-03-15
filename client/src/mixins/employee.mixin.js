var EmployeeStore = require('../stores/employee.store');

module.exports = {

  store: EmployeeStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.employee[field] = value;
    this.state.errors[field] = this.validator[field].call(this, value);
    return this.setState({employee: this.state.employee, errors: this.state.errors});
  },

  validateAll: function () {
    this.state.errors.username = this.validator.username.call(this, this.state.employee.username);
    this.state.errors.email = this.validator.email.call(this, this.state.employee.email);
    this.state.errors.firstName = this.validator.firstName.call(this, this.state.employee.firstName);
    this.state.errors.lastName = this.validator.lastName.call(this, this.state.employee.lastName);
    this.setState({errors: this.state.errors});
  },

  hasErrors: function () {
    var errors = this.state.errors;
    return !!(errors.username || errors.email || errors.firstName || errors.lastName);
  },

  validator : {
    // username min 1 max 40
    username: function (value) {
      // min length 1
      if (!value || value.length < 1) {
        return 'You must provide a username.';
      }
      // max length 40
      else if (value.length > 40) {
        return 'Username can only be 40 characters long.';
      }
      return null;
    },

    email: function (value) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(value)) {
        return 'Email must be valid';
      }

      return null;
    },

    firstName: function (value) {
      if (!value || value.length < 1) {
        return 'You must provide a first name.';
      }

      return null;
    },

    lastName: function (value) {
      if (!value || value.length < 1) {
        return 'You must provide a last name.';
      }

      return null;
    },

    admin: function (value) {
      return null;
    }
  },

  toggleAdmin: function () {
    var employee = this.state.employee;
    employee.admin = !employee.admin;
    this.setState({employee: employee});
  }
};
