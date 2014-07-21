/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router');

var Section = React.createClass({
  mixins: [Router.ActiveState],
  
  getInitialState: function () {
    return {
      section: 'Employees'
    };
  },

  updateActiveState: function () {
    var section;
    if (Section.isActive('employees')) {
      section = 'Employees';
    } else if (Section.isActive('projects')) {
      section = 'Projects';
    } else if (Section.isActive('timesheets')) {
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

module.exports = Section;
