/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.ActiveState;

var NavBar = React.createClass({
  mixins: [ 
    Router.ActiveState 
  ],

  getInitialState: function () {
    return {
      title: 'Timesheetz'
    };
  },

  logout: function () {
    alert('logging out');
  },

  updateActiveState: function () {
    this.setState({
      projectsActive: NavBar.isActive('projects'),
      employeesActive: NavBar.isActive('employees'),
      timesheetsActive: NavBar.isActive('timesheets')
    });
  },

  render : function () {
    var cx = React.addons.classSet;

    var projectsClasses = cx({
      active: this.state.projectsActive
    });

    var employeesClasses = cx({
      active: this.state.employeesActive
    });

    var timesheetsClasses = cx({
      active: this.state.timesheetsActive
    });

    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-clock-o fa-lg"/> {this.state.title}
            </a>
          </div>
          <ul if="authenticated" className="nav navbar-nav navbar-left">
            <li className={projectsClasses}>
              <Link to="projects">Projects</Link>
            </li>
            <li className={employeesClasses}>
              <Link to="employees">Employees</Link>
            </li>
            <li className={timesheetsClasses}>
              <Link to="timesheets" params={{user_id: 123}}>Timesheets</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a className="navbar-brand logout" onClick={this.logout}>  
                <i className="fa fa-power-off"/> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = NavBar;