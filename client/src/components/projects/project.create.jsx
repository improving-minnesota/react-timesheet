var React = require('react/addons');
var Router = require('react-router');

var ProjectForm = require('./project.form');
var ProjectActions = require('../../actions/project.actions');
var ProjectMixin = require('../../mixins/project.mixin');

var ProjectCreate = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ProjectMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      project: {},
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

  saveProject: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      ProjectActions.create(this.state.project);
      this.transitionTo('projects');
    }
  },

  render : function () {
    return (
      <ProjectForm project={this.state.project}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        validateAll={this.validateAll}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        validate={this.validate} />
    );
  }
});

module.exports = ProjectCreate;
