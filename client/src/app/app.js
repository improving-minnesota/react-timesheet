/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var NavBar = require('../navbar');
var SectionHeader = require('../section');

var App = React.createClass({
  mixins: [
    Router.ActiveState,
    FluxChildMixin
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
