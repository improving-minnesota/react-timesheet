var React = require('react/addons');
var Router = require('react-router');

var ProjectTable = require('./project.table');
var ChangeMixin = require('../../mixins/change.mixin');

var ProjectActions = require('../../actions/project.actions');
var ProjectStore = require('../../stores/project.store');
var Paginator = require('../common/paginator');

var Projects = React.createClass({

  mixins: [
    Router.Navigation,
    ChangeMixin
  ],

  store: ProjectStore,

  requestProjects: ProjectActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  createNew: function () {
    this.transitionTo('projects.create');
  },

  componentDidMount: function () {
    this.requestProjects();
  },

  onPageChange: function (page) {
    console.log(JSON.stringify(page));
  },

  render: function () {

    return (
      <div>
        <div className="one column row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            <i className="icon-plus"/> New Project
          </button>
        </div>

        <div className="row">
          <ProjectTable projects={this.state.projects} />
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={20} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Projects;
