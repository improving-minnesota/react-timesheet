var React = require('react/addons');

module.exports = function (componentName, mockTagName) {
  return React.createClass({
    displayName: componentName || 'MockComponent',

    render: function() {
      var mockTagName = mockTagName || "div";
      
      return React.DOM[mockTagName]({
        className: this.props.className
      },
      this.props.children);
    }
  });
};