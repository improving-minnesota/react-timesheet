/** @jsx React.DOM */

var React = require('react/addons');

var TimeunitRow = React.createClass({

  getInitialState: function () {
    return {};
  },

  showDetail: function showDetail () {
    var timeunit = this.props.timeunit;
    if (timeunit.deleted) {
      // notifications.error('You cannot edit a deleted timeunit.');
      return;
    }
    Router.transitionTo('timeunits.detail', timeunit);
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.getFlux().stores.actions.remove(this.props.timeunit);
  },

  restore: function restore (e) {
   e.stopPropagation();
   this.getFlux().stores.actions.restore(this.props.timeunit);
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

        <td>{timeunit.project}</td>
        <td>{timeunit.dateWorked | momentShortDate}</td>
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
