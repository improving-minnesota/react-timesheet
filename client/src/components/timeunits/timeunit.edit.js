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
      saveText: 'Update',
      timeunit: {},
      errors: {}
    };
  },

  saveTimeunit: function (event) {
    event.preventDefault();
    TimeunitActions.update(this.props.timesheet, this.state.timeunit);
    this.goBack();
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.state.timeunit}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveTimeunit} />
    );
  }
});

module.exports = TimeunitEdit;
