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

  setEndDate: function (date) {
    this.props.validate({target:{name: 'endDate', value: date}});
    this.props.validate({target:{name: 'beginDate', value: this.props.timesheet.beginDate}});
  },

  setBeginDate: function (date) {
    this.props.validate({target:{name: 'beginDate', value: date}});
    this.props.validate({target: {name: 'endDate', value: this.props.timesheet.endDate}});
  },

  render : function () {
    return (
      <div className="ui ten column centered grid">
        <div className="fourteen wide column">
          <form className="ui inline form" name="timesheetForm" onSubmit={this.props.onSave}>
            <div className="two fields">

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
                  <TextInput name="description" placeholder="Timesheet Description"
                    value={this.props.timesheet.description}
                    error={this.props.errors.description}
                    onChange={this.props.validate} />
              }/>

              <FieldWrap inputId="timesheet-beginDate" label="Begin Date"
                error={this.props.errors.beginDate}
                formField={
                  <DatePicker key='ts-begin' className="form-control"
                    selected={moment(this.props.timesheet.beginDate)}
                    value={this.props.timesheet.beginDate}
                    onChange={this.setBeginDate}
                    error={this.props.errors.beginDate}/>
              }/>

              <FieldWrap inputId="timesheet-endDate" label="End Date"
                error={this.props.errors.endDate}
                formField={
                  <DatePicker key='ts-end' className="form-control"
                    selected={moment(this.props.timesheet.endDate)}
                    value={this.props.timesheet.endDate}
                    onChange={this.setEndDate}
                    error={this.props.errors.endDate} />
              }/>

            </div>

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

module.exports = TimesheetForm;
