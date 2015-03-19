var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NavBar = require('./common/navigation/navbar');
var SectionHeader = require('./common/section');
var LoginStore = require('../stores/login.store');

var App = React.createClass({

  statics: {
    willTransitionTo: function (transition, params) {
      return LoginStore.requireAuthenticatedUser(transition);
    }
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
      </div>
    );
  }
});

module.exports = App;
