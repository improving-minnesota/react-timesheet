var React = require('react/addons');
var Router = require('react-router');

var TextInput = require('../common/form/text.input');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var ProjectForm = React.createClass({

  propTypes: {
    project: React.PropTypes.object,
    validate: React.PropTypes.func.isRequired,
    hasErrors: React.PropTypes.func.isRequired,
    saveText: React.PropTypes.string.isRequired,
    errors: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('projects');
  },

  render : function () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="projectForm" onSubmit={this.props.onSave}>

            <TextInput name="name"
              label="Name"
              placeholder="Project Name"
              value={this.props.project.name}
              error={this.props.errors.name}
              onChange={this.props.validate} />

            <TextInput name="description"
              label="Description"
              placeholder="Project Description"
              value={this.props.project.description}
              error={this.props.errors.description}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ProjectForm;
