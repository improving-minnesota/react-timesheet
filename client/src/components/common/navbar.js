/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.State;

var LoginStore = require('../../stores/login.store');
var LoginActions = require('../../actions/login.actions');

var NavBar = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function () {
    var loggedInUser = LoginStore.getState().user;
    var userId = (loggedInUser !== null && loggedInUser._id) ? loggedInUser._id : 'all';

    return {
      title: 'Timesheetz',
      user: {
        _id: userId
      }
    };
  },

  logout: function () {
    LoginActions.logout();
  },

  onLoginChange: function () {
    var loginState = LoginStore.getState();

    this.setState({
      user: loginState.user
    });
  },

  componentWillMount: function () {
    LoginStore.addChangeListener(this.onLoginChange);
  },

  componentWillUnmount: function () {
    LoginStore.removeChangeListener(this.onLoginChange);
  },

  render : function () {
    var cx = React.addons.classSet;
    var activeRoutes = _.pluck(this.getRoutes(), 'name').join('.').split('.');

    var projectsClasses = cx({
      active: _.contains(activeRoutes, 'projects')
    });

    var employeesClasses = cx({
      active: _.contains(activeRoutes, 'employees')
    });

    var timesheetsClasses = cx({
      active: _.contains(activeRoutes, 'timesheets')
    });

    return (
      <div className="navbar navbar-default navbar-fixed-top">
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
              <Link to="timesheets" params={{user_id: this.state.user._id}}>Timesheets</Link>
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
