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

  describe('clicking the new employee button', function () {
    it('should transition to the create employee route', function () {
      var button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('timesheets.create');
    });
  });
});
