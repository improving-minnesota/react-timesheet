/** @jsx React.DOM */

var React = require('react/addons');

var TimeunitRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    alert('show detail');
    // if (timeunit.deleted) {
    //   notifications.error('You cannot edit a deleted timeunit.');
    //   return;
    // }
    // Router.transitionTo('app.timeunits.detail', timeunit);
  },

  remove: function remove () {
    alert('remove!');
    // data.remove('timeunits', timeunit) 
    //   .then(function () {
    //     notifications.success('timeunit : ' + timeunit.username + ', was deleted.');
    //   })
    //   .catch(function (x) {
    //     timeunit.deleted = false;
    //     notifications.error('Error attempting to delete timeunit.');
    //   });
// $event.stopPropagation();
  },

  restore: function restore () {
   alert('restore!');
   // data.restore('timeunits', timeunit)
   //    .then(function (restored) {
   //      notifications.success('timeunit was restored.');
   //    })
   //    .catch(function (x) {
   //      timeunit.deleted = true;
   //      notifications.error('Error restoring timeunit.');
   //    });
// $event.stopPropagation();
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
      'btn': true,
      'btn-sm': true,
      'btn-default': timeunit.deleted,
      'btn-danger': !timeunit.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{{timeunit.project}}</td>
        <td>{{timeunit.dateWorked | momentShortDate}}</td>
        <td>{{timeunit.hoursWorked}}</td>
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
