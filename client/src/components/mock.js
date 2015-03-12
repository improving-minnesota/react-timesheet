var React = require('react/addons');

module.exports = {
  mockComponent: function(component, mockedComponent, mockTagName){
    var reactClass = React.createClass({
          render: function() {
            var mockTagName = mockTagName || "div";
            return React.DOM[mockTagName](null, this.props.children);
          }
        }),
        mock = sinon.stub(component, mockedComponent, reactClass);
    return mock;
  }
};