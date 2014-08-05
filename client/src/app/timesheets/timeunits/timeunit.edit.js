/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');

var TimeunitEdit = React.createClass({

  getInitialState: function () {

  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.props.timeunit} />
    );
  }
});

module.exports = TimeunitEdit;