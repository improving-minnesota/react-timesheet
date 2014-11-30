/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var LoginStore = require('../stores/login.store');

var Security = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  statics: {
    willTransitionTo: function (transition, params) {
      return LoginStore.requireAuthenticatedUser(transition)
        .then(function () {
          transition.retry();
        })
        .catch(function () {
          transition.abort();
        });
    }
  },

  onLoginChange: function () {
    var loginState = LoginStore.getState();

    if (loginState.pausedTransition) {
      this.transitionTo('login');
    }
  },

  componentWillMount: function () {
    LoginStore.addChangeListener(this.onLoginChange);
  },

  componentWillUnmount: function () {
    LoginStore.removeChangeListener(this.onLoginChange);
  },

  render : function () {
    return (<RouteHandler />);
  }
});

module.exports = Security;
