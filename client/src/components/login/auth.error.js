/** @jsx React.DOM */

var React = require('React');

var AuthError = React.createClass({

  render: function () {
    if (this.props.authError) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-danger">
              {this.props.authError}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div />);
    }
  }
});

module.exports = AuthError;
