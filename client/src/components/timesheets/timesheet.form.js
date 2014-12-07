/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');
var DatePicker = require('../common/datepicker/datepicker');

var FieldWrap = require('../common/field.wrap');

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

              <FieldWrap inputId="timesheet-name" label="Name" formField={
                <input type="text" className="form-control"
                  name="name" placeholder="Timesheet Name"
                  ref="name" value={this.props.timesheet.name}
                  minLength={1} maxLength={40} required />
              }/>

              <FieldWrap inputId="timesheet-description" label="Description" formField={
                <input type="text" className="form-control"
                  name="description" placeholder="Timesheet Description"
                  ref="description" value={this.props.timesheet.description}
                  minLength={1} maxLength={255} required />
              }/>

              <FieldWrap inputId="timesheet-beginDate" label="Begin Date" formField={
                <DatePicker key='ts-begin' className="form-control"
                  selected={moment(this.props.timesheet.beginDate)}
                  onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="timesheet-endDate" label="End Date" formField={
                <DatePicker key='ts-end' className="form-control"
                  selected={moment(this.props.timesheet.endDate)}
                  onChange={this.props.validate} />
              }/>

              <div className="row">
                <hr/>
              </div>

              <div className="row">
                <div className="col-sm-2 col-sm-offset-8">
                  <button className="btn btn-primary btn-block" type="submit"
                    ng-disabled="timesheetForm.$invalid">{this.props.saveText}</button>
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

module.exports = TimesheetForm;
