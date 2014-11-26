/** @jsx React.DOM */

var React = require('react');

var ProgressBar = React.createClass({

  // scope.$watch(function() {
  //   return (scope.hoursWorked / scope.hoursRequired) * 100;
  // }, function(percentComplete) {
  //   scope.percentComplete = percentComplete;
  // });

  progressClicked: function () {
    this.props.report({percentComplete: Math.round(this.props.percentComplete) + '%'});
  },

  render: function () {
    return (
      <div className="progress" onClick={this.progressClicked}>
        <div className="progress-bar" style={width: this.props.percentComplete + '%'}>
          {Math.round(this.props.percentComplete)}%
        </div>
      </div>

    );
  }
});

module.exports = ProgressBar;
