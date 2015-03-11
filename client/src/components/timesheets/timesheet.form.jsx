var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');

var DatePicker = require('../common/datepicker/datepicker');
var TextInput = require('../common/form/text.input');
var SaveButton = require('../common/buttons/save.button');
var CancelButton = require('../common/buttons/cancel.button');

var TimesheetForm = React.createClass({

  propTypes: {
    timesheet:          React.PropTypes.object,
    saveText:           React.PropTypes.string.isRequired,
    validate:           React.PropTypes.func.isRequired,
    validateBeginDate:  React.PropTypes.func.isRequired,
    validateEndDate:    React.PropTypes.func.isRequired,
    errors:             React.PropTypes.object,
    hasErrors:          React.PropTypes.func.isRequired
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('timesheets', {
      user_id: this.getParams().user_id
    });
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
                name="beginDate"
                label="Begin Date"
                selected={moment(this.props.timesheet.beginDate)}
                value={this.props.timesheet.beginDate}
                onChange={this.props.validateBeginDate}
                error={this.props.errors.beginDate} />

              <DatePicker key='ts-end'
                name="beginDate"
                label="End Date"
                selected={moment(this.props.timesheet.endDate)}
                value={this.props.timesheet.endDate}
                onChange={this.props.validateEndDate}
                error={this.props.errors.endDate} />
            </div>

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

module.exports = TimesheetForm;
