var React = require('react/addons');
var ProjectRow = require('./project.row');

var ProjectTable = React.createClass({

  render: function () {

    var projectRows = this.props.projects.map(function (project) {
      return (
        <ProjectRow project={project} key={project._id} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className="tsz-table-delete-column">Delete</th>
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
