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
      saveText: 'Save',
      timeunit: {},
      errors: {}
    };
  },

  saveTimeunit: function () {
    this.preventDefault();
    TimeunitActions.create(this.props.timesheet, this.state.timeunit);
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

module.exports = TimeunitCreate;
