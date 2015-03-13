var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  mock = require('../mock');

describe('Timeunit Form Component: ', function () {

  var TimeunitForm,
    timeunit,
    element,
    spies;

  beforeEach(function () {
    spies = {
      validate: sinon.stub(),
      hasErrors: sinon.stub()
    };

    timeunit = {
      "dateWorked": "2013-11-25T00:00:00.000Z", 
      "hoursWorked": 8,
      "project": "Project1"
    };

    TimeunitForm = require('./timeunit.form');
    element = TestUtils.renderIntoDocument(
      <TimeunitForm timeunit={timeunit}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors} />
    );
  });

  it('should instantiate the TimeunitForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', function () {
    it('should return to the timesheet route', function () {
      
    });
  });
});
