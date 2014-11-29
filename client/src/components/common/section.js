/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var SectionHeader = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getSectionName: function () {
    var sectionName;

    if (this.isActive('employees')) {
      sectionName = 'Employees';
    } else if (this.isActive('employees.create')) {
      sectionName = 'Create Employee';
    } else if (this.isActive('employees.detail')) {
      sectionName = 'Update Employee';
    } else if (this.isActive('projects')) {
      sectionName = 'Projects';
    } else if (this.isActive('projects.create')) {
      sectionName = 'Create Project';
    } else if (this.isActive('projects.detail')) {
      sectionName = 'Update Project';
    } else if (this.isActive('timesheets')) {
      sectionName = 'Timesheets';
    }

    return sectionName;
  },

  render : function () {

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>{this.getSectionName()}</h2>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = SectionHeader;
