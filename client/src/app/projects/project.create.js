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
    // data.create('projects', $scope.project)
    //   .then(function (created) {
    //     notifications.success('Project : ' + created.username + ', created.');
    //     Router.transitionTo('app.projects.detail', {_id: created._id});
    //   })
    //   .catch(function (x) {
    //     notifications.error('There was an error creating project.');
    //   });
  },

  cancel: function () {
    // Router.transitionTo('app.projects', {}, {reload: true});
  },
  
  render : function () {
    return (
      <ProjectForm project={this.state.project} />
    );
  }
});

module.exports = ProjectCreate; 