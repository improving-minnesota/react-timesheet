var _ = require('lodash');

describe('Projects Component: ', function () {

  var Projects,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Projects = require('./projects');
    element = TestUtils.renderIntoDocument(<Projects />);
  });

  it('should instantiate the Projects', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
