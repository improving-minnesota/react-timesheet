/** @jsx React.DOM */

var React = require('React');
var ProjectForm = require('./project.form');

var ProjectCreate = React.createClass({

  getInitialState: function () {
    return {
      saveText: 'Create',
      project: {admin: false}
    };
  },

  saveProject: function () {
   
  },

  cancel: function () {
    Router.transitionTo('projects');
  },
  
  render : function () {
    return (
      <ProjectForm project={this.state.project} />
    );
  }
});

module.exports = ProjectCreate; 