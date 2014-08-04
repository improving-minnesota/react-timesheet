/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimesheetTable = require('./timesheet.table');

var Timesheets = React.createClass({

  getInitialState: function () {
    return {
      timesheets: this.requestTimesheets()
    };
  },

  requestTimesheets: function () {
    return [];
  },

  createNew: function () {
    Router.transitionTo('timesheets.create');
  },

  render: function () {
    return (
      <div className="tsz-timesheet-list">
        <div>
          <div className="row tsz-form-row">
            <div className="col-sm-2 pull-right">
              <button className="btn btn-primary btn-block" type="button" onClick={this.createNew()}>
                <i className="icon-plus"/> New Timesheet
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TimesheetTable timesheets={this.state.timesheets} />
            </div>
          </div>

          <div className="text-center">
            <div pagination
              total-items="pageConfig.totalItems" 
              ng-model="pageConfig.page" 
              items-per-page="pageConfig.limit" 
              boundary-links="true" 
              rotate="true" 
              ng-change="requestTimesheets(page)">
            </div>
          </div>

        </div>
        
        <this.props.activeRouteHandler />
      </div>

    );
  }
});

module.exports = Timesheets;
