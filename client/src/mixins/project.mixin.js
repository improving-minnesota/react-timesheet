var Router = require('react-router');
var ProjectStore = require('../stores/project.store');

var validator = require('../services/validator');

module.exports = {

  store: ProjectStore,

  validate: function (event) {
    var validated = validator.validate(event.target);

    this.state.project[event.target.name] = event.target.value;
    this.setState(this.state.project);
  },

  goToProjectsTable: function () {
    Router.transitionTo('projects');
  }
};
