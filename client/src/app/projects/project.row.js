/** @jsx React.DOM */

var React = require('react/addons');

var ProjectRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  getStateFromFlux: function () {

  },

  showDetail: function showDetail () {
    alert('show detail');
    // if (project.deleted) {
    //   notifications.error('You cannot edit a deleted project.');
    //   return;
    // }
    // Router.transitionTo('app.projects.detail', project);
  },

  remove: function remove (e) {
    e.stopPropagation();
  },

  restore: function restore (e) {
    e.stopPropagation();
  },
  
  render: function () {
    var cx = React.addons.classSet;
    var project = this.props.project;

    var rowClasses = cx({
      'repeated-item': true,
      'fadeable-row': true,
      'faded': project.deleted
    });

    var buttonClasses = cx({
      'btn': true,
      'btn-sm': true,
      'btn-default': project.deleted,
      'btn-danger': !project.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{project.name}</td>
        <td>{project.description}</td>
        <td>
          <button className={buttonClasses} onClick={project.deleted ? this.restore : this.remove}>
            {project.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
}); 

module.exports = ProjectRow;
