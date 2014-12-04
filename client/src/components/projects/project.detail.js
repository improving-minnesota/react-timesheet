/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');

var ProjectForm = require('./project.form.js');
var ProjectActions = require('../../actions/project.actions');

var ChangeMixin = require('../../mixins/change.mixin');
var ProjectMixin = require('../../mixins/project.mixin');

var ProjectDetail = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ChangeMixin,
    ProjectMixin
  ],

  saveProject: function () {
    ProjectActions.update(this.state.project);
    this.goToProjectsTable();
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
      project: {}
    };
  },

  componentDidMount: function() {
    this.get(this.getParams()._id);
  },

  render : function () {
    return (
      <ProjectForm project={this.state.project}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        onCancel={this.goBack}
        validate={this.validate} />
    );
  }
});

module.exports = ProjectDetail;
