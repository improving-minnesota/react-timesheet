var React = require('react/addons');

module.exports = {
  mockComponent: function(mockTagName) {
    return React.createClass({
      render: function() {
        var mockTagName = mockTagName || "div";
        return React.DOM[mockTagName](null, this.props.children);
      }
    });
  }
};