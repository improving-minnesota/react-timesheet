var moment = require('moment');
var React = require('react/addons');
var Router = require('react-router');

var DatePicker = require('../common/datepicker/datepicker');
var Select = require('../common/form/select');
var TextInput = require('../common/form/text.input');
var NumberInput = require('../common/form/number.input');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var TimeunitForm = React.createClass({

  propTypes: {

  },

  mixins: [
    Router.Navigation
  ],

  options: [
    {value: 'project1', label: 'Project 1'},
    {value: 'project2', label: 'Project 2'},
    {value: 'project3', label: 'Project 3'}
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.goBack();
  },

  render : function () {

    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="timeunitForm" onSubmit={this.props.onSave}>

            <Select name="project"
              label="Project"
              value={this.props.timeunit.project}
              placeholder="Select Project"
              onChange={this.props.validate}
              error={this.props.errors.project}
              options={this.options} />

            <DatePicker key='tu-worked'
              name="dateWorked"
              label="Date"
              className="form-control"
              selected={moment(this.props.timeunit.dateWorked)}
              onChange={this.props.validate}
              error={this.props.errors.dateWorked}/>

            <NumberInput name="hoursWorked"
              label="Hours Worked"
              placeholder="Hours Worked"
              value={this.props.timeunit.hoursWorked}
              error={this.props.errors.hoursWorked}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

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

module.exports = TimeunitForm;
