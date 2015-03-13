var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  mock = require('../mock');

describe('Timesheet Form Component: ', function () {

  var TimesheetForm,
    timesheet,
    errors,
    element,
    spies;

  beforeEach(function () {
    spies = {
      validate: sinon.stub(),
      hasErrors: sinon.stub()
    };

    timesheet = {
      "name": "UserOne",
      "beginDate": "2013-11-18T00:00:00.000Z",
      "endDate": "2013-11-24T00:00:00.000Z",
      "description": "Timesheet one for user"
    };

    errors = {};

    TimesheetForm = require('./timesheet.form');
    element = TestUtils.renderIntoDocument(
      <TimesheetForm timesheet={timesheet}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors} />
    );
  });

  it('should instantiate the TimesheetForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', function () {
    it('should return to the timesheet route', function () {
      
    });
  });
});
