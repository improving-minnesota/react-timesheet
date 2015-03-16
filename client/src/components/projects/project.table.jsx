var React = require('react/addons');
var ProjectRow = require('./project.row');

var ProjectTable = React.createClass({

  propTypes: {
    projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render: function () {
    var key = 1;

    var projectRows = this.props.projects.map(function (project) {
      return (
        <ProjectRow project={project} key={++key} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projectRows}
        </tbody>
      </table>
    );
  }
});

module.exports = ProjectTable;
