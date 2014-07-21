/** @jsx React.DOM */

var React = require('react/addons');

var ProjectRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    alert('show detail');
    // if (project.deleted) {
    //   notifications.error('You cannot edit a deleted project.');
    //   return;
    // }
    // Router.transitionTo('app.projects.detail', project);
  },

  remove: function remove () {
    alert('remove!');
    // data.remove('projects', project) 
    //   .then(function () {
    //     notifications.success('project : ' + project.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     project.deleted = false;
    //     notifications.error('Error attempting to delete project.');
    //   });
// $event.stopPropagation();
  },

  restore: function restore () {
   alert('restore!');
   // data.restore('projects', project)
   //    .then(function (restored) {
   //      notifications.success('project was restored.');
   //    })
   //    .catch(function (x) {
   //      project.deleted = true;
   //      notifications.error('Error restoring project.');
   //    });
// $event.stopPropagation();
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
