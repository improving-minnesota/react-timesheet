var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employees Component: ', function () {

  var Employees,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './employee.table': mock.mockComponent(),
      '../common/navigation/paginator': mock.mockComponent()
    };

    Employees = proxyquire('./employees', proxies);
    element = TestUtils.renderIntoDocument(<Employees />);
  });

  it('should instantiate the Employees', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', function () {
    it('should transition to the create employee route', function () {
      
    });
  });
});
