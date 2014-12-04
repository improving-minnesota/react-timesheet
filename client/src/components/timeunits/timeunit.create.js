/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitForm = require('./timeunit.form');
var TimeunitMixin = require('../../mixins/timeunit.mixin');

var TimeunitCreate = React.createClass({

  mixins: [
    Router.Navigation,
    TimeunitMixin
  ],

  getInitialState: function () {
    return {
      timeunit: {}
    };
  },

  saveTimeunit: function () {
    TimeunitActions.create(this.props.timesheet, this.state.timeunit);
    this.goBack();
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.state.timeunit}
        onSave={this.saveTimeunit}
        onCancel={this.goBack} />
    );
  }
});

module.exports = TimeunitCreate;
