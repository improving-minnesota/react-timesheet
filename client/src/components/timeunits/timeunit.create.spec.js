var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Timeunit Create Component: ', function () {

  var TimeunitCreate,
    element,
    spies,
    proxies;

  beforeEach(function () {
    proxies = {
      './timeunit.form': mock.mockComponent(),
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getParams: sinon.stub.returns([{_id: '12345'}])
        }
      }
    };

    TimeunitCreate = proxyquire('./timeunit.create', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitCreate />);
  });

  it('should instantiate the TimeunitCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a timeunit', function () {
    it('should validate the entire timeunit', function () {

    });

    describe('when the timeunit passes validation', function () {
      it('should fire a create action', function () {

      });

      it('should transition back to the timeunit list', function () {
        
      });
    });
  });
});
