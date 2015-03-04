var React = require('react/addons');
var Router = require('react-router');

var ProjectActions = require('../../actions/project.actions');
var ProjectStore = require('../../stores/project.store');

var SnackbarAction = require('../../actions/snackbar.actions');

var ProjectRow = React.createClass({

  mixins: [
    Router.Navigation
  ],

  showDetail: function showDetail () {
    if (this.props.project.deleted) {
      SnackbarAction.error('You cannot edit a deleted project.');
      return;
    }
    ProjectStore.setState({project: this.props.project});
    this.transitionTo('projects.detail', {_id: this.props.project._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.project.deleted = true;
    ProjectActions.remove(this.props.project);
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.project.deleted = false;
    ProjectActions.restore(this.props.project);
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
      'ui': true,
      'primary': true,
      'button': true,
      'small': true,
      'positive': project.deleted,
      'negative': !project.deleted
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
