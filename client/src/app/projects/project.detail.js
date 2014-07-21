/** @jsx React.DOM */

var React = require('React');
var ProjectForm = require('./project.form.js');

var ProjectDetail = React.createClass({

  getProject: function (projectId) {
    // return data.get('projects', $stateParams);
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
    Router.transitionTo('app.projects');
  },

  getInitialState: function () {
    return {
      saveText: 'Update'
    };
  },  

  componentDidMount: function() {
    this.getProject();
  },
  
  render : function () {
    return (
      <ProjectForm project={this.state.project} />
    );
  }
});

module.exports = ProjectDetail; 

