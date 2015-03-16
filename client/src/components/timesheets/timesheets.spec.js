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
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the Timesheets', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
