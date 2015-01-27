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
      <div className="ui progress" onClick={this.progressClicked}>
        <div className="bar" style={width: this.props.percentComplete + '%'}>
          <div className="progress">{Math.round(this.props.percentComplete)}%</div>
        </div>
      </div>

    );
  }
});

module.exports = ProgressBar;
