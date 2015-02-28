var moment = require('moment');
var React = require('react/addons');
var Router = require('react-router');

var FieldWrap = require('../common/field.wrap');
var DatePicker = require('../common/datepicker/datepicker');
var Select = require('react-select');
var TextInput = require('../common/text.input');
var NumberInput = require('../common/number.input');
var SaveButton = require('../common/save.button');
var CancelButton = require('../common/cancel.button');
var Separator = require('../common/form.separator');

var TimeunitForm = React.createClass({

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
            <FieldWrap inputId="timeunit-project" label="Project"
              error={this.props.errors.project}
              formField={
                <Select name="project"
                  value={this.props.timeunit.project}
                  placeholder="Select Project"
                  onChange={this.props.onChange}
                  error={this.props.errors.project}
                  options={this.options} />
            }/>

            <FieldWrap inputId="timeunit-dateWorked" label="Date"
              error={this.props.errors.dateWorked}
              formField={
                <DatePicker key='tu-worked' className="form-control"
                  selected={moment(this.props.timeunit.dateWorked)}
                  onChange={this.props.validate}
                  error={this.props.errors.dateWorked}/>
            }/>

            <FieldWrap inpuId="timeunit-hoursWorked" label="Hours"
              error={this.props.errors.hoursWorked}
              formField={
                <NumberInput name="hoursWorked" placeholder="Hours Worked"
                  value={this.props.timeunit.hoursWorked}
                  error={this.props.errors.hoursWorked}
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

module.exports = TimeunitForm;
