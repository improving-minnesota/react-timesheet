/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');
var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitMixin = require('../../mixins/timeunit.mixin');
var ChangeMixin = require('../../mixins/change.mixin');

var TimeunitEdit = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    ChangeMixin,
    TimeunitMixin
  ],

  getInitialState: function () {
    return {
      timeunit: {}
    };
  },

  saveTimeunit: function () {
    TimeunitActions.update(this.props.timesheet, this.state.timeunit);
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

module.exports = TimeunitEdit;
