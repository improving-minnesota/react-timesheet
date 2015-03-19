var React = require('react/addons');
var Router = require('react-router');

var ProjectTable = require('./project.table');
var ProjectActions = require('../../actions/project.actions');
var ProjectStore = require('../../stores/project.store');

var Paginator = require('../common/navigation/paginator');

var Projects = React.createClass({

  mixins: [
    Router.Navigation
  ],

  store: ProjectStore,

  requestProjects: ProjectActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  createNew: function () {
    this.transitionTo('projects.create');
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.requestProjects({page: 1});
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange: function (page) {
    this.requestProjects({page: page});
  },

  render: function () {

    var numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    var pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="one column row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            New Project
          </button>
        </div>

        <div className="row">
          <ProjectTable projects={this.state.pageConfig.data} store={ProjectStore}/>
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Projects;
