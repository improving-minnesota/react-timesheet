var React = require('react/addons');
var classes = require('react-classes');
var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.State;

var NavBar = React.createClass({

  mixins: [
    Router.State,
    Router.Navigation,
    classes
  ],

  getInitialState: function () {
    return {
      title: 'Timesheetz',
      user: {_id: 'all'}
    };
  },

  render : function () {
    var activeRoutes = _.pluck(this.getRoutes(), 'name').join('.').split('.');

    var projectsClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'projects')
    });

    var employeesClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'employees')
    });

    var timesheetsClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'timesheets')
    });

    return (
      <div className="ui fixed menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className={projectsClasses} to="projects">Projects</Link>
        <Link className={employeesClasses} to="employees">Employees</Link>
        <Link className={timesheetsClasses} to="timesheets" params={{user_id: this.state.user._id}}>Timesheets</Link>

      </div>
    );
  }
});

module.exports = NavBar;
