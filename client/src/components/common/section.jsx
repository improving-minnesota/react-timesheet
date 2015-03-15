var _ = require('lodash');
var React = require('react/addons');
var Router = require('react-router');

var SectionHeader = React.createClass({

  mixins: [
    Router.State,
    Router.Navigation
  ],

  getSectionName: function () {
    var activeRoute = _.last(this.getRoutes()).name;
    var sectionNames = {
      'employees': 'Employees',
      'employees.create': 'Create Employee',
      'employees.detail': 'Edit Employee',
      'projects': 'Projects',
      'projects.create': 'Create Project',
      'projects.detail': 'Update Project',
      'timesheets': 'Timesheets',
      'timesheets.detail': 'Timesheet Detail',
      'timesheets.edit': 'Edit Timesheet',
      'timesheets.create': 'Create Timesheet',
      'timesheets.detail.timeunits.detail': 'Update Time',
      'timesheets.detail.timeunits.create': 'Log Time'
    };

    return sectionNames[activeRoute] || '';
  },

  render : function () {

    return (
      <div className="row">
        <div className="sixteen wide column">
          <h2>{this.getSectionName()}</h2>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = SectionHeader;
