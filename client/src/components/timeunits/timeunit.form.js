/** @jsx React.DOM */

var moment = require('moment');
var React = require('react/addons');
var Router = require('react-router');

var FieldWrap = require('../common/field.wrap');
var DatePicker = require('../common/datepicker/datepicker');
var Select2 = require('../common/select2');
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
    {key: 'project1', value: 'project1', label: 'Project 1'},
    {key: 'project2', value: 'project2', label: 'Project 2'},
    {key: 'project3', value: 'project3', label: 'Project 3'}
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.goBack();
  },

  render : function () {

    var projectOptions = this.options.map(function (option) {
      return (
        <option value={option.value} key={option.key}>{option.label}</option>
      );
    });

    return (

      <div className="tsz-timeunit-form">
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="timeunitForm" onSubmit={this.props.onSave}>

              <FieldWrap inputId="timeunit-project" label="Project"
                error={this.props.errors.project}
                formField={
                  <Select2 name="project"
                    value={this.props.timeunit.project}
                    placeholder="Select Project"
                    onChange={this.props.onChange}>
                    {projectOptions}
                  </Select2>
              }/>

              <FieldWrap inputId="timeunit-dateWorked" label="Date"
                error={this.props.errors.dateWorked}
                formField={
                  <DatePicker key='tu-worked' className="form-control"
                    selected={moment(this.props.timeunit.dateWorked)}
                    onChange={this.props.validate}
                    min="timesheet.beginDate"
                    max="timesheet.endDate"/>
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

              <div className="row">
                <SaveButton hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
                <CancelButton onCancel={this.onCancel} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimeunitForm;
