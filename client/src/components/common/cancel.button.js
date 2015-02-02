/** @jsx React.DOM */

var React = require('react/addons');

var CancelButton = React.createClass({

  render: function () {
    return (
      <div className="eight wide column">
        <button className="ui secondary button red" type="button"
          onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
});

module.exports = CancelButton;
