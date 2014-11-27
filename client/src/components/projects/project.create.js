/** @jsx React.DOM */

var React = require('React');

var ProjectForm = require('./project.form');
var ProjectActions = require('../../actions/project.actions');

var EmployeeMixin = require('../../mixins/project.mixin');
var ChangeMixin = require('../../mixins/change.mixin');

var ProjectCreate = React.createClass({

  mixins: [
    ChangeMixin,
    EmployeeMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      section: 'Create Project',
      project: {}
    };
  },

  saveProject: function () {
    ProjectActions.create(this.state.project);
    this.goToProjectsTable();
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

module.exports = ProjectCreate;
