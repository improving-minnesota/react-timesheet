var React = require('react/addons');
var classNames = require('classnames');
var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.State;

var NavBar = React.createClass({

  mixins: [
    Router.State,
    Router.Navigation,
  ],

  getInitialState: function () {
    return {
      title: 'Timesheetz',
      user: {_id: 'all'}
    };
  },

  render : function () {
    var activeRoutes = _.pluck(this.getRoutes(), 'name').join('.').split('.');

    var projectsClasses = classNames('item', {
      active: _.contains(activeRoutes, 'projects')
    });

    var employeesClasses = classNames('item', {
      active: _.contains(activeRoutes, 'employees')
    });

    var timesheetsClasses = classNames('item', {
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
