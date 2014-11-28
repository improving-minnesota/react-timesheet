/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var NavBar = require('./common/navbar');
var SectionHeader = require('./common/section');
var LoginStore = require('../stores/login.store');

var App = React.createClass({
  mixins: [
    Router.ActiveState
  ],

  statics: {
    willTransitionTo: function (transition, params) {
      return LoginStore.requireAuthenticatedUser()
        .then(function () {
          transition.retry();
        })
        .catch(function () {
          transition.abort();
        });
    }
  },

  render : function () {

    return (
      <div>
        <NavBar />
        <div className="container">
          <SectionHeader />
          <div className="row">
            <div className="col-xs-12">
              <this.props.activeRouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
