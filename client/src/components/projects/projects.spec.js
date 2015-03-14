var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Projects Component: ', function () {

  var Projects,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './employee.table': mockComponent(),
      '../common/navigation/paginator': mockComponent()
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
