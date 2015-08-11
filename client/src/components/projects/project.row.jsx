var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classnames');

var ProjectRow = React.createClass({

  propTypes: {
    project: React.PropTypes.object
  },

  mixins: [
    Router.Navigation
  ],

  render: function () {
    var project = this.props.project;

    var rowClasses = classNames('repeated-item fadeable-row', {
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
