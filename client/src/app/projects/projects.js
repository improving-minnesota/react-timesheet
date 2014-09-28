/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProjectTable = require('./project.table');

var Projects = React.createClass({

  mixins: [
    FluxChildMixin,
    StoreWatchMixin('projects')
  ],

  getInitialState: function () {
    return {
      projects: []
    };
  },

  getStateFromFlux: function () {
    var flux = this.getFlux();
    return {
      projects: flux.store('projects').projects
    };
  },

  requestProjects: function () {
    //this.getFlux().actions.projects.list();

    return [
      {"_id": "111", "name": "Project1", "description": "This is your first project"},
      {"_id": "222", "name": "Project2", "description": "This is your second project"},
      {"_id": "333", "name": "Project3", "description": "This is the third project"}
    ];
  },

  createNew: function () {
    Router.transitionTo('projects.create');
  },

  componentDidMount: function () {
    this.requestProjects();
  },
  
  render: function () {
    return (
      <div className="tsz-project-list">
        <div>
          <div className="row tsz-form-row">
            <div className="col-sm-2 pull-right">
              <button className="btn btn-primary btn-block" type="button" onClick={this.createNew}>
                <i className="icon-plus"/> New Project
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ProjectTable projects={this.state.projects} />
            </div>
          </div>

          <div className="text-center">
            <div pagination
              total-items="pageConfig.totalItems" 
              ng-model="pageConfig.page" 
              items-per-page="pageConfig.limit" 
              boundary-links="true" 
              rotate="true" 
              ng-change="requestProjects(page)">
            </div>
          </div>

        </div>
        
        <this.props.activeRouteHandler />
      </div>
    );
  }
}); 

module.exports = Projects;

