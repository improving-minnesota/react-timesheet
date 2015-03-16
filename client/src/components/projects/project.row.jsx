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

  render: function () {
    var project = this.props.project;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': project.deleted
    });

    return (
      <tr className={rowClasses}>
        <td>{project.name}</td>
        <td>{project.description}</td>
      </tr>
    );
  }
});

module.exports = ProjectRow;
