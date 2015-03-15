var moment = require('moment');
var React = require('react/addons');
var Router = require('react-router');

var ProjectActions = require('../../actions/project.actions');
var ProjectStore = require('../../stores/project.store');

var DatePicker = require('../common/datepicker/datepicker');
var Select = require('../common/form/select');
var TextInput = require('../common/form/text.input');
var NumberInput = require('../common/form/number.input');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var TimeunitForm = React.createClass({

  propTypes: {
    timeunit:           React.PropTypes.object.isRequired,
    validate:           React.PropTypes.func.isRequired,
    validateProject:    React.PropTypes.func.isRequired,
    validateDateWorked: React.PropTypes.func.isRequired,
    onSave:             React.PropTypes.func.isRequired,
    errors:             React.PropTypes.object,
    saveText:           React.PropTypes.string,
    hasErrors:          React.PropTypes.func
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  projectStore: ProjectStore,

  requestProjects: ProjectActions.list,

  getInitialState: function () {
    return {
      options: [],
      projects: []
    };
  },

  onProjectsChange: function () {
    var projects = this.projectStore.getState().projects;
    var options = [];

    projects.forEach(function (project) {
      options.push({value: project.name, label: project.name});
    });

    this.setState({options: options, projects: projects});
  },

  componentWillMount: function () {
    this.projectStore.addChangeListener(this.onProjectsChange);
    this.requestProjects();
  },

  componentWillUnmount: function () {
    this.projectStore.removeChangeListener(this.onProjectsChange);
  },

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('timesheets.detail', {
      user_id: this.getParams().user_id,
      _id: this.getParams()._id
    });
  },

  render : function () {

    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="timeunitForm" onSubmit={this.props.onSave}>

            <Select name="project"
              label="Project"
              placeholder="Select Project"
              value={this.props.timeunit.project}
              onChange={this.props.validateProject}
              error={this.props.errors.project}
              options={this.state.options} />

            <DatePicker key='tu-worked'
              name="dateWorked"
              label="Date"
              className="form-control"
              selected={moment(this.props.timeunit.dateWorked)}
              onChange={this.props.validateDateWorked}
              error={this.props.errors.dateWorked}/>

            <NumberInput name="hoursWorked"
              label="Hours Worked"
              placeholder="Hours Worked"
              value={this.props.timeunit.hoursWorked}
              error={this.props.errors.hoursWorked}
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

module.exports = TimeunitForm;
