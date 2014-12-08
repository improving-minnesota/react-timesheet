/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');

var DatePicker = require('../common/datepicker/datepicker');
var FieldWrap = require('../common/field.wrap');
var TextInput = require('../common/text.input');
var SaveButton = require('../common/save.button');
var CancelButton = require('../common/cancel.button');
var Separator = require('../common/form.separator');

var TimesheetForm = React.createClass({

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.goBack();
  },

  render : function () {
    return (
      <div className="tsz-timesheet-form" ng-cloak>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" name="timesheetForm" onSubmit={this.props.onSave}>

              <FieldWrap inputId="timesheet-name" label="Name"
                error={this.props.errors.name}
                formField={
                  <TextInput name="name" placeholder="Timesheet Name"
                    value={this.props.timesheet.name}
                    error={this.props.errors.name}
                    onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="timesheet-description" label="Description"
                error={this.props.errors.description}
                formField={
                  <TextInput name="name" placeholder="Timesheet Description"
                    value={this.props.timesheet.description}
                    error={this.props.errors.description}
                    onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="timesheet-beginDate" label="Begin Date"
                error={this.props.errors.beginDate}
                formField={
                  <DatePicker key='ts-begin' className="form-control"
                    selected={moment(this.props.timesheet.beginDate)}
                    onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="timesheet-endDate" label="End Date"
                error={this.props.errors.endDate}
                formField={
                  <DatePicker key='ts-end' className="form-control"
                    selected={moment(this.props.timesheet.endDate)}
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

module.exports = TimesheetForm;
