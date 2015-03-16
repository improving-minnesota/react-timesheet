var _ = require('lodash');

describe('Employees Component: ', function () {

  var Employees,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Employees = require('./employees');
    element = TestUtils.renderIntoDocument(<Employees />);
  });

  it('should instantiate the Employees', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
