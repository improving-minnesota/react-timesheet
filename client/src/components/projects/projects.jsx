var React = require('react/addons');
var Router = require('react-router');

var ProjectTable = require('./project.table');

var Projects = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      pageConfig: {
        data: require('../../../../api/data/projects.json').projects
      }
    };
  },

  render: function () {

    return (
      <div>
        <div className="row">
          <ProjectTable projects={this.state.pageConfig.data}/>
        </div>
      </div>
    );
  }
});

module.exports = Projects;
