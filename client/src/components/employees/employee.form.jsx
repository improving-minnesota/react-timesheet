var React = require('react/addons');
var Router = require('react-router');

var TextInput = require('../common/form/text.input');
var Checkbox = require('../common/form/checkbox');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var EmployeeForm = React.createClass({

  propTypes: {
    employee:   React.PropTypes.object,
    errors:     React.PropTypes.object,
    validate:   React.PropTypes.func.isRequired,
    hasErrors:  React.PropTypes.func.isRequired,
    toggleAdmin: React.PropTypes.func
  },

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('employees');
  },

  render : function () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="employeeForm" onSubmit={this.props.onSave}>

            <TextInput name="username"
              label="Username"
              placeholder="Employee Username"
              value={this.props.employee.username}
              error={this.props.errors.username}
              onChange={this.props.validate} />

            <TextInput name="email"
              label="Email"
              placeholder="Employee Email"
              value={this.props.employee.email}
              error={this.props.errors.email}
              onChange={this.props.validate} />

            <TextInput name="firstName"
              label="First Name"
              placeholder="First Name"
              value={this.props.employee.firstName}
              error={this.props.errors.firstName}
              onChange={this.props.validate} />

            <TextInput name="lastName"
              label="Last Name"
              placeholder="Last Name"
              value={this.props.employee.lastName}
              error={this.props.errors.lastName}
              onChange={this.props.validate} />

            <Checkbox name="admin"
              label="Admin"
              value={this.props.employee.admin}
              onClick={this.props.toggleAdmin}
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

module.exports = EmployeeForm;
