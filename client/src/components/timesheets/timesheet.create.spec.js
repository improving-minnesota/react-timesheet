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

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
    spies.create = sinon.stub(TimesheetActions, 'create');
    spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId'});
  });

  afterEach(function () {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
    spies.getParams.restore();
  });

  it('should instantiate the TimesheetCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a timesheet', function () {
    beforeEach(function () {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the timesheet passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the timesheet list', function () {
        expect(spies.transitionTo).to.have.been.calledWith('timesheets', {user_id: 'userId'});
      });
    });
  });
});
