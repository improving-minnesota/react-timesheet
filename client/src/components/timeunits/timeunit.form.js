/** @jsx React.DOM */

var moment = require('moment');
var React = require('react/addons');
var Router = require('react-router');

var FieldWrap = require('../common/field.wrap');
var DatePicker = require('../common/datepicker/datepicker');
var Select2 = require('../common/select2');

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

              <FieldWrap inputId="timeunit-project" label="Project" formField={
                <Select2 name="timeunit-project"
                  value={this.props.timeunit.project}
                  ref="project"
                  placeholder="Select Project..."
                  onChange={this.props.onChange}
                  className="form-control">
                  {projectOptions}
                </Select2>
              }/>

              <FieldWrap inputId="timeunit-dateWorked" label="Date" formField={
                <DatePicker key='tu-worked' className="form-control"
                  selected={moment(this.props.timeunit.dateWorked)}
                  onChange={this.props.validate}
                  min="timesheet.beginDate"
                  max="timesheet.endDate"/>
              }/>

              <FieldWrap inpuId="timeunit-hoursWorked" label="Hours" formField={
                <input type="number" className="form-control"
                  name="timeunit-hoursWorked"
                  placeholder="Hours Worked"
                  value={this.props.timeunit.hoursWorked}
                  ref="hoursWorked"
                  required />
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" type="submit"
                    ng-disabled="timeunitForm.$invalid">{this.props.saveText}</button>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-danger btn-block" type="button"
                    onClick={this.onCancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimeunitForm;
