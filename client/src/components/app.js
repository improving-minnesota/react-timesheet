/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var NavBar = require('./common/navbar');
var SectionHeader = require('./common/section');
var Authentication = require('../services/security');

var App = React.createClass({
  mixins: [
    Router.ActiveState
  ],

  // statics: {
  //   willTransitionTo: function (transition, params) {
  //     return Authentication.requireAuthenticatedUser()
  //       .then(function () {
  //         //transition.abort();
  //       });
  //   }
  // },

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
