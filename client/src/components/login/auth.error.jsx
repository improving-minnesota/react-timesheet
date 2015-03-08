var React = require('react/addons');

var AuthError = React.createClass({

  propTypes: {
    authError: React.PropTypes.string
  },

  render: function () {
    if (this.props.authError) {
      return (
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui secondary inverted raised red segment">
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
