/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

var ProjectForm = require('./project.form.js');
var ProjectActions = require('../../actions/project.actions');

var ChangeMixin = require('../../mixins/change.mixin');
var ProjectMixin = require('../../mixins/project.mixin');

var ProjectDetail = React.createClass({

  mixins: [
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
      section: 'Update Project',
      project: {}
    };
  },

  componentDidMount: function() {
    this.get(this.props.params._id);
  },

  render : function () {
    return (
      <ProjectForm project={this.state.project}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        onCancel={this.goToProjectsTable}
        validate={this.validate} />
    );
  }
});

module.exports = ProjectDetail;
