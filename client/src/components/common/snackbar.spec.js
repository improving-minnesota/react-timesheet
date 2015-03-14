var _ = require('lodash');

describe('Snackbar Component: ', function () {

  var Snackbar,
    element,
    spies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Snackbar = require('./snackbar');
    element = TestUtils.renderIntoDocument(<Snackbar />);

    spies = {

    };
  });

  afterEach(function () {
    
  });

  it('should instantiate the Snackbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when there is no message', function () {
    it('should hide the snackbar', function () {

    });
  });

  describe('when there is a message', function () {
    it('should display the snackbar', function () {

    });

    describe('and it is a success message', function () {
      it('should reveal a success snackbar', function () {

      });
    });

    describe('and it is an info message', function () {
      it('should reveal an info snackbar', function () {
        
      });
    });

    describe('and it is an error message', function () {
      it('should reveal an error snackbar', function () {
        
      });
    });
  });

});
