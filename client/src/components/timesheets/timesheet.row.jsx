var React = require('react/addons');
var Router = require('react-router');

var TimesheetActions = require('../../actions/timesheet.actions');
var TimesheetStore = require('../../stores/timesheet.store');
var LoginStore = require('../../stores/login.store');

var NotificationsAction = require('../../actions/notifications.actions');
var DateFilter = require('../../util/date');

var TimesheetRow = React.createClass({

  mixins: [
    Router.Navigation
  ],

  showDetail: function showDetail () {
    var timesheet = this.props.timesheet;
    if (timesheet.deleted) {
      NotificationsAction.error('You cannot edit a deleted timesheet.');
      return;
    }
    TimesheetStore.setState({timesheet: timesheet});
    this.transitionTo('timesheets.detail',
      {user_id: timesheet.user_id, _id: timesheet._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.timesheet.deleted = true;
    TimesheetActions.remove(this.props.timesheet);
  },

  restore: function restore (e) {
   e.stopPropagation();
   this.props.timesheet.deleted = false;
   TimesheetActions.restore(this.props.timesheet);
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
      'ui': true,
      'primary': true,
      'button': true,
      'small': true,
      'positive': timesheet.deleted,
      'negative': !timesheet.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{DateFilter.momentShortDate(timesheet.beginDate)}</td>
        <td>{DateFilter.momentShortDate(timesheet.endDate)}</td>
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
