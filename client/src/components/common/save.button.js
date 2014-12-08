/** @jsx React.DOM */

var React = require('react/addons');

var SaveButton = React.createClass({

  render: function () {
    return (
      <div className="col-sm-2 col-sm-offset-8">
        <button className="btn btn-primary btn-block" disabled={this.props.hasErrors} type="submit">
          {this.props.saveText}
        </button>
      </div>
    );
  }
});

module.exports = SaveButton;
