/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var FluxChildMixin = require('fluxxor').FluxChildMixin;

var TimeunitForm = require('./timeunit.form');

var TimeunitEdit = React.createClass({

  mixins: [
    FluxChildMixin(React)
  ],

  getInitialState: function () {

  },

  save: function () {
    this.getFlux().actions.timeunits.update(this.props.timeunit);
  },

  cancel: function () {
    Router.transitionTo('timesheet.detail.timeunit.detail', {});
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.props.timeunit} save={this.save} cancel={this.cancel} />
    );
  }
});

module.exports = TimeunitEdit;