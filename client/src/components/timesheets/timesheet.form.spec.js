var _ = require('lodash');

describe('Timesheet Form Component: ', function () {

  var TimesheetForm,
    CancleButton,
    timesheet,
    errors,
    element,
    spies = {};

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    CancelButton = require('../common/buttons/cancel.button');
  });

  beforeEach(function () {
    timesheet =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    TimesheetForm = require('./timesheet.form');
    element = TestUtils.renderIntoDocument(
      <TimesheetForm timesheet={timesheet}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
    // spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId'});
  });

  afterEach(function () {
    // spies.transitionTo.restore();
    // spies.getParams.restore();
  });

  it('should instantiate the TimesheetForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test me
});
