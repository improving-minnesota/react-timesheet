var _ = require('lodash');

describe('Timeunit Form Component: ', function () {

  var TimeunitForm,
    CancleButton,
    timeunit,
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
    timeunit =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    TimeunitForm = require('./timeunit.form');
    element = TestUtils.renderIntoDocument(
      <TimeunitForm timeunit={timeunit}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId', _id: 'timesheetId'});
  });

  afterEach(function () {
    spies.transitionTo.restore();
    spies.getParams.restore();
  });

  it('should instantiate the TimeunitForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', function () {
    it('should go back to the timeunits home', function () {
      var cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      var button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail', { _id: 'timesheetId', user_id: "userId" });
    });
  });
});
