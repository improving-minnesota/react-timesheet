var React = require('react/addons');
var Router = require('react-router');

var TimesheetTable = require('./timesheet.table');

var Timesheets = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      pageConfig: {
        data: require('../../../../api/data/user.timesheets.json').timesheets
      }
    };
  },

  render: function () {
    return (
      <div>
        <div className="row">
          <TimesheetTable timesheets={this.state.pageConfig.data} />
        </div>
      </div>
    );
  }
});

module.exports = Timesheets;
