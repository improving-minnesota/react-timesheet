var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classnames');

var DateUtils = require('../../util/date.utils');

var TimesheetRow = React.createClass({

  propTypes: {
    timesheet: React.PropTypes.object
  },

  mixins: [
    Router.Navigation
  ],

  render: function () {
    var timesheet = this.props.timesheet;

    var rowClasses = classNames('repeated-item fadeable-row', {
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
