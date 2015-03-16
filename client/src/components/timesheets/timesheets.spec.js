var _ = require('lodash');

describe('Timesheets Component: ', function () {

  var Timesheets,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Timesheets = require('./timesheets');
    element = TestUtils.renderIntoDocument(<Timesheets />);
  });

  it('should instantiate the Timesheets', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
