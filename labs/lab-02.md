** First component and spec via Browserify/Reactify

main.jsx
```javascript
var React = require('react/addons');
var Hello = require('./hello');

React.render(<Hello />, document.getElementById('app'));
```

hello.spec.js
```javascript
describe('Hello World: ', function () {

   var Hello,
     element;

   var React, TestUtils;

   beforeEach(function () {
     React = require('react/addons');
     TestUtils = React.addons.TestUtils;
   });

   beforeEach(function () { 
     Hello = require('./hello');
     element = TestUtils.renderIntoDocument(<Hello />);
   });

   it('should instantiate the Hello World', function () {
     expect(TestUtils.isCompositeComponent(element)).to.be.true;
   });

 });

```

hello.jsx
```javascript
var React = require('react/addons');

var Hello = React.createClass({

  getInitialState: function () {
    return {
      greeting: 'Howdy!!'
    };
  },

  getDefaultProps: function () {
    return {
      friend: 'Partner!!'
    };
  },

  render : function () {

   return (
    <div className="ui message">
      <div className="ui huge header">{this.state.greeting}</div>
      <div className="ui large header">{this.props.friend}</div>
      <p>You are now an expert Browserifier</p>
    </div>
   );
 }
});

module.exports = Hello;
```