var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NavBar = require('./common/navbar');
var SectionHeader = require('./common/section');
var LoginStore = require('../stores/login.store');

var Snackbar = require('./common/snackbar');
var NotificationsStore = require('../stores/notifications.store');

var App = React.createClass({

  statics: {
    willTransitionTo: function (transition, params) {
      return LoginStore.requireAuthenticatedUser(transition);
    }
  },

  getInitialState: function () {
    return {
      message: 'Hello!!',
      messageType: 'success'
    };
  },

  componentWillMount: function () {
    NotificationsStore.addChangeListener(this.notify);
  },

  componentWillUnmount: function () {
    NotificationsStore.removeChangeListener(this.notify);
  },

  notify: function () {
    this.setState(NotificationsStore.getState());
  },

  render : function () {

    return (
      <div>
        <NavBar />
        <div className="container">
          <SectionHeader />
          <div className="row">
            <RouteHandler />
          </div>
        </div>

        <Snackbar />
      </div>
    );
  }
});

module.exports = App;
