var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');
var TimeunitActions = require('../../actions/timeunit.actions');
var TimeunitMixin = require('../../mixins/timeunit.mixin');

var TimeunitEdit = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    TimeunitMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Update',
      timeunit: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  saveTimeunit: function (e) {
    e.stopPropagation();
    TimeunitActions.update(this.props.timesheet, this.state.timeunit);
    this.transitionTo('timesheets.detail', {});
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
