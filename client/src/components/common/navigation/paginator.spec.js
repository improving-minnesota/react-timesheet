var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../../mock');

describe('Paginator : ', function () {

  var Paginator,
    element,
    spies;

  beforeEach(function () {
    Paginator = require('./paginator');
    element = TestUtils.renderIntoDocument(<Paginator />);
  });

  it('should instantiate the Paginator', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when on the first page', function () {
    it('should disable the previous button', function () {

    });

    describe('and click the next button', function () {
      it('should go to the second page', function () {

      });
    });

    describe('and click on a page number button', function () {
      it('should go to that numbered page', function () {

      });
    });

  });

  describe('when on the last page', function () {
    it('should disable the next page button', function () {

    });

    describe('and click the previous button', function () {
      it('should go to the previous page', function () {

      });
    });

    describe('and click a number button', function () {
      it('should go to the numbered page', function () {

      });
    });
  });

  describe('when on a numbered page', function () {
    describe('and click the previous button', function () {
      it('should go to the previous page', function () {

      });
    });

    describe('and click the next button', function () {
      it('should go to the next page', function () {

      });
    });

    describe('and click a numbered button', function () {
      it('should go to the numbered page', function () {
        
      });
    });
  });
});
