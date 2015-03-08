var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');

var DatePicker = require('../common/datepicker/datepicker');
var TextInput = require('../common/form/text.input');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var TimesheetForm = React.createClass({

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('timesheets');
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
      <div className="ui centered grid">
        <div className="fourteen wide column">
          <form className="ui inline form" name="timesheetForm" onSubmit={this.props.onSave}>
            <div className="two fields">
              <TextInput name="name"
                placeholder="Timesheet Name"
                label="Name"
                value={this.props.timesheet.name}
                error={this.props.errors.name}
                onChange={this.props.validate} />

              <TextInput name="description"
                placeholder="Timesheet Description"
                label="Description"
                value={this.props.timesheet.description}
                error={this.props.errors.description}
                onChange={this.props.validate} />
            </div>

            <div className="two fields">
              <DatePicker key='ts-begin'
                label="Begin Date"
                selected={moment(this.props.timesheet.beginDate)}
                value={this.props.timesheet.beginDate}
                onChange={this.setBeginDate}
                error={this.props.errors.beginDate}/>

              <DatePicker key='ts-end'
                label="End Date"
                selected={moment(this.props.timesheet.endDate)}
                value={this.props.timesheet.endDate}
                onChange={this.setEndDate}
                error={this.props.errors.endDate} />
            </div>

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
