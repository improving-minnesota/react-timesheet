var _ = require('lodash');
var Router = require('react-router');
var ProjectStore = require('../stores/project.store');

module.exports = {

  store: ProjectStore,

  validate: function (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.project[field] = value;
    this.state.errors[field] = this.validator[field].call(this, value);
    return this.setState({project: this.state.project, errors: this.state.errors});
  },

  validateAll: function () {
    this.state.errors.name = this.validator.name.call(this, this.state.project.name);
    this.state.errors.description = this.validator.description.call(this, this.state.project.description);
    this.setState({errors: this.state.errors});
  },

  hasErrors: function () {
    return this.state.errors.name || this.state.errors.description;
  },

  validator: {
    name: function (value) {
      // min length 1
      if (!value || value.length < 1) {
        return 'You must provide a name.';
      }
      // max length 40
      else if (value.length > 40) {
        return 'Name can only be 40 characters long.';
      }
      return null;
    },

    description: function (value) {
      // minlength 1
      if (!value || value.length < 1) {
        return 'You must provide a description.';
      }
      // maxlength 255
      else if (value.length > 255) {
        return 'Description can only be 255 characters long.';
      }
      return null;
    }
  }
};
