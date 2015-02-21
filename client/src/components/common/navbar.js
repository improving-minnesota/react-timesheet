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
      active: _.contains(activeRoutes, 'projects'),
      item: true
    });

    var employeesClasses = cx({
      active: _.contains(activeRoutes, 'employees'),
      item: true
    });

    var timesheetsClasses = cx({
      active: _.contains(activeRoutes, 'timesheets'),
      item: true
    });

    return (
      <div className="ui menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className={projectsClasses} to="projects">Projects</Link>
        <Link className={employeesClasses} to="employees">Employees</Link>
        <Link className={timesheetsClasses} to="timesheets" params={{user_id: this.state.user._id}}>Timesheets</Link>

        <a className="right menu item logout" onClick={this.logout}>
          <i className="fa fa-power-off"/> Logout
        </a>
      </div>
    );
  }
});

module.exports = NavBar;
