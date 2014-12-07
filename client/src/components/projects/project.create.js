/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var ProjectForm = require('./project.form');
var ProjectActions = require('../../actions/project.actions');

var ProjectMixin = require('../../mixins/project.mixin');
var ChangeMixin = require('../../mixins/change.mixin');

var ProjectCreate = React.createClass({

  mixins: [
    Router.Navigation,
    ChangeMixin,
    ProjectMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      project: {}
    };
  },

  saveProject: function (event) {
    event.preventDefault();
    ProjectActions.create(this.state.project);
    this.goBack();
  },

  render : function () {
    return (
      <ProjectForm project={this.state.project}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        validate={this.validate} />
    );
  }
});

module.exports = ProjectCreate;
