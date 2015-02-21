var React = require('react/addons');
var Router = require('react-router');
var PropTypes = React.PropTypes;

var FieldWrap = require('../common/field.wrap');
var TextInput = require('../common/text.input');
var SaveButton = require('../common/save.button');
var CancelButton = require('../common/cancel.button');
var Separator = require('../common/form.separator');

var ProjectForm = React.createClass({

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.goBack();
  },

  render : function () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="projectForm" onSubmit={this.props.onSave}>

            <FieldWrap inputId="project-name" label="Name"
              error={this.props.errors.name}
              formField={
                <TextInput name="name" placeholder="Project Name"
                  value={this.props.project.name}
                  error={this.props.errors.name}
                  onChange={this.props.validate} />
            }/>

            <FieldWrap inputId="project-description" label="Description"
              error={this.props.errors.description}
              formField={
                <TextInput name="description" placeholder="Project Description"
                  value={this.props.project.description}
                  error={this.props.errors.description}
                  onChange={this.props.validate} />
            }/>

            <Separator />

            <div className="ui sixteen column right floated grid">
              <SaveButton hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ProjectForm;
