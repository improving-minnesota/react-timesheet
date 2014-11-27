/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetStore = require('../../stores/timesheet.store');

var notifications = require('../../services/notifications');

var TimesheetRow = React.createClass({

  showDetail: function showDetail () {
    var timesheet = this.props.timesheet;
    if (timesheet.deleted) {
      notifications.error('You cannot edit a deleted timesheet.');
      return;
    }
    TimesheetStore.setState({timesheet: timesheet});
    Router.transitionTo('timesheets.detail', {_id: timesheet._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.timesheet.deleted = true;
    TimesheetActions.remove(this.props.timesheet);
  },

  restore: function restore (e) {
   e.stopPropagation();
   this.props.timesheet.deleted = false;
   TimesheetActions.restor(this.props.timesheet);
  },

  render: function () {
    var cx = React.addons.classSet;
    var timesheet = this.props.timesheet;

    var rowClasses = cx({
      'repeated-item': true,
      'fadeable-row': true,
      'faded': timesheet.deleted
    });

    var buttonClasses = cx({
      'btn': true,
      'btn-sm': true,
      'btn-default': timesheet.deleted,
      'btn-danger': !timesheet.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{timesheet.beginDate}</td>
        <td>{timesheet.endDate}</td>
        <td>{timesheet.name}</td>
        <td>{timesheet.description}</td>
        <td>
          <button className={buttonClasses} onClick={timesheet.deleted ? this.restore : this.remove}>
            {timesheet.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = TimesheetRow;
