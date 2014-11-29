/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');

var TimeunitEdit = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function () {

  },

  save: function () {

  },

  cancel: function () {
    this.transitionTo('timesheet.detail.timeunit.detail', {});
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.props.timeunit} save={this.save} cancel={this.cancel} />
    );
  }
});

module.exports = TimeunitEdit;
