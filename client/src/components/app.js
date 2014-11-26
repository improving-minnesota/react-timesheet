/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var NavBar = require('./common/navbar');
var SectionHeader = require('./common/section');

var App = React.createClass({
  mixins: [
    Router.ActiveState
  ],

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
