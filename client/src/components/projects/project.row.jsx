var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var ProjectRow = React.createClass({

  propTypes: {
    project: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    classes
  ],

  remove: function remove (e) {
    e.stopPropagation();
    this.props.project.deleted = true;
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.project.deleted = false;
  },

  render: function () {
    var project = this.props.project;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': project.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
      'positive': project.deleted,
      'negative': !project.deleted
    });

    return (
      <tr className={rowClasses}>

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
