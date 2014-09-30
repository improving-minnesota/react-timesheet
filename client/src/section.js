/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var SectionHeader = React.createClass({
  mixins: [
    Router.ActiveState
  ],
  
  getInitialState: function () {
    return {
      section: 'Employees'
    };
  },

  updateActiveState: function () {
    var section;
    
    if (SectionHeader.isActive('employees')) {
      section = 'Employees';
    } else if (SectionHeader.isActive('employees.create')) {
      section = 'Create Employee';
    } else if (SectionHeader.isActive('employees.detail')) {
      section = 'Update Employee';
    } else if (SectionHeader.isActive('projects')) {
      section = 'Projects';
    } else if (SectionHeader.isActive('projects.create')) {
      section = 'Create Project';
    } else if (SectionHeader.isActive('projects.detail')) {
      section = 'Update Project';
    } else if (SectionHeader.isActive('timesheets')) {
      section = 'Timesheets';
    }

    this.setState({section: section});
  },

  render : function () {

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>{this.state.section}</h2>
          <hr/>   
        </div>  
      </div>
    );
  }
});

module.exports = SectionHeader;
