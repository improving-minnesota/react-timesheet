/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router');

var NavBar = require('../navbar');
var SectionHeader = require('../section');

var App = React.createClass({
  mixins: [Router.ActiveState],

  render : function () {

    return (
      <div>
        <NavBar />
        <div className="container">
          <SectionHeader />
          <div className="row">
            <div className="col-xs-12">
              <this.props.activeRoute />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
