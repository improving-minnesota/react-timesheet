var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var TimesheetActions = require('../../actions/timesheet.actions');
var LoginStore = require('../../stores/login.store');

var SnackbarAction = require('../../actions/snackbar.actions');
var DateUtils = require('../../util/date.utils');

var TimesheetRow = React.createClass({

  propTypes: {
    timesheet: React.PropTypes.object,
    store: React.PropTypes.object.isRequired
  },

  mixins: [
    Router.Navigation,
    classes
  ],

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
    var timesheet = this.props.timesheet;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': timesheet.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
      'positive': timesheet.deleted,
      'negative': !timesheet.deleted
    });

    return (
      <tr className={rowClasses}>

        <td>{DateUtils.momentShortDate(timesheet.beginDate)}</td>
        <td>{DateUtils.momentShortDate(timesheet.endDate)}</td>
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
