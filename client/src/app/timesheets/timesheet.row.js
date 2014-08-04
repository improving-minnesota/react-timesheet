/** @jsx React.DOM */

var React = require('react/addons');

var TimesheetRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    alert('show detail');
    // if (timesheet.deleted) {
    //   notifications.error('You cannot edit a deleted timesheet.');
    //   return;
    // }
    // Router.transitionTo('app.timesheets.detail', timesheet);
  },

  remove: function remove () {
    alert('remove!');
    // data.remove('timesheets', timesheet) 
    //   .then(function () {
    //     notifications.success('timesheet : ' + timesheet.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     timesheet.deleted = false;
    //     notifications.error('Error attempting to delete timesheet.');
    //   });
// $event.stopPropagation();
  },

  restore: function restore () {
   alert('restore!');
   // data.restore('timesheets', timesheet)
   //    .then(function (restored) {
   //      notifications.success('timesheet was restored.');
   //    })
   //    .catch(function (x) {
   //      timesheet.deleted = true;
   //      notifications.error('Error restoring timesheet.');
   //    });
// $event.stopPropagation();
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
