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
