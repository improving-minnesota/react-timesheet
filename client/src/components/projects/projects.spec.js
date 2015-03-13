var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Projects Component: ', function () {

  var Projects,
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

    Projects = proxyquire('./projects', proxies);
    element = TestUtils.renderIntoDocument(<Projects />);
  });

  it('should instantiate the Projects', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new project button', function () {
    it('should transition to the create project route', function () {
      
    });
  });
});
