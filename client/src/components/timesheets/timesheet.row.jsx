var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var DateUtils = require('../../util/date.utils');

var TimesheetRow = React.createClass({

  propTypes: {
    timesheet: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    classes
  ],

  render: function () {
    var timesheet = this.props.timesheet;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': timesheet.deleted
    });

    return (
      <tr className={rowClasses}>
        <td>{DateUtils.momentShortDate(timesheet.beginDate)}</td>
        <td>{DateUtils.momentShortDate(timesheet.endDate)}</td>
        <td>{timesheet.name}</td>
        <td>{timesheet.description}</td>
      </tr>
    );
  }
});

module.exports = TimesheetRow;
