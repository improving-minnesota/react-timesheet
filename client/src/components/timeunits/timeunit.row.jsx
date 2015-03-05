var React = require('react/addons');
var Router = require('react-router');

var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitStore = require('../../stores/timeunit.store');

var DateFilter = require('../../util/date');
var SnackbarAction = require('../../actions/snackbar.actions');

var TimeunitRow = React.createClass({

  mixins: [
    Router.Navigation
  ],

  showDetail: function showDetail () {
    var timeunit = this.props.timeunit;
    var timesheet = this.props.timesheet;

    if (timeunit.deleted) {
      SnackbarAction.error('You cannot edit a deleted timeunit.');
      return;
    }
    TimeunitStore.setState({timeunit: timeunit});
    this.transitionTo('timesheets.detail.timeunits.edit',
      {user_id: timesheet.user_id, _id: timesheet._id, timeunit_id: timeunit._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.timeunit.deleted = true;
    TimeunitActions.remove(this.props.timesheet, this.props.timeunit);
  },

  restore: function restore (e) {
   e.stopPropagation();
   this.props.timeunit.deleted = false;
   TimeunitActions.restore(this.props.timesheet, this.props.timeunit);
  },

  render: function () {
    var cx = React.addons.classSet;
    var timeunit = this.props.timeunit;

    var rowClasses = cx({
      'repeated-item': true,
      'fadeable-row': true,
      'faded': timeunit.deleted
    });

    var buttonClasses = cx({
      'ui': true,
      'primary': true,
      'button': true,
      'small': true,
      'positive': timeunit.deleted,
      'negative': !timeunit.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{timeunit.project}</td>
        <td>{DateFilter.momentShortDate(timeunit.dateWorked)}</td>
        <td>{timeunit.hoursWorked}</td>
        <td>
          <button className={buttonClasses} onClick={timeunit.deleted ? this.restore : this.remove}>
            {timeunit.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = TimeunitRow;
