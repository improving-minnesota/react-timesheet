/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var ProjectForm = require('./project.form.js');

var ProjectDetail = React.createClass({

  mixins: [
    FluxChildMixin(React),
    StoreWatchMixin('ProjectStore')
  ],

  getProject: function (projectId) {
    // return data.get('projects', $stateParams);
  },

  saveProject: function () {
    this.getFlux().actions.projects.update(this.state.project);
  },

  cancel: function () {
    Router.transitionTo('projects');
  },

  getInitialState: function () {
    return {
      saveText: 'Update'
    };
  },  

  getStateFromFlux: function () {
    return this.getFlux().store('ProjectStore').getState();
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

