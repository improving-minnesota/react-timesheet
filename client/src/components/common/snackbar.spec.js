var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Snackbar Component: ', function () {

  var Snackbar,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {

    };

    Snackbar = proxyquire('./snackbar', proxies);
    element = TestUtils.renderIntoDocument(<Snackbar />);
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
