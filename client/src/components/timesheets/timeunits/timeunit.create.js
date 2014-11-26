/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var TimeunitForm = require('./timeunit.form');

var TimeunitCreate = React.createClass({

  getInitialState: function () {
    return {
      timeunit: {
        user_id: $stateParams.user_id,
        timesheet_id: $stateParams._id,
        dateWorked: $scope.timesheet.beginDate
      }
    };
  },

  render: function () {
    return (
      <TimeunitForm timeunit={this.state.timeunit} />
    );
  }
});

module.exports = TimeunitCreate;