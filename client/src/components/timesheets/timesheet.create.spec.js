var _ = require('lodash');

describe('Timesheet Create Component: ', function () {

  var TimesheetCreate,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    TimesheetCreate = require('./timesheet.create');
    TimesheetActions = require('../../actions/timesheet.actions');

    element = TestUtils.renderIntoDocument(<TimesheetCreate />);

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
    // spies.validateAll = sinon.stub(element, 'validateAll');
    // spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId'});
    spies.create = sinon.stub(TimesheetActions, 'create');
  });

  afterEach(function () {
    // spies.validateAll.restore();
    // spies.transitionTo.restore();
    // spies.getParams.restore();
    spies.create.restore();
  });

  it('should instantiate the TimesheetCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test me
});
