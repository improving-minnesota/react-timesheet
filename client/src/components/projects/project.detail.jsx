var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var ProjectForm = require('./project.form');
var ProjectActions = require('../../actions/project.actions');
var ProjectMixin = require('../../mixins/project.mixin');

var ProjectDetail = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ProjectMixin
  ],

  saveProject: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      ProjectActions.update(this.state.project);
      this.transitionTo('projects');
    }
  },

  get: function (projectId) {
    var project = this.store.getState().project;
    if (_.isEmpty(project)) {
      ProjectActions.get(projectId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      project: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.get(this.getParams()._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  render : function () {
    return (
      <ProjectForm project={this.state.project}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        validate={this.validate}/>
    );
  }
});

module.exports = ProjectDetail;
