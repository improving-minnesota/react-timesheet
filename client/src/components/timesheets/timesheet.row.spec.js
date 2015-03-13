var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  mock = require('../mock');

describe('Timesheet Row Component: ', function () {

  var TimesheetRow,
    timesheet,
    element,
    spies;

  beforeEach(function () {
    spies = {

    };

    timesheet = {
      "name": "UserOne",
      "beginDate": "2013-11-18T00:00:00.000Z",
      "endDate": "2013-11-24T00:00:00.000Z",
      "description": "Timesheet one for user"
    };

    TimesheetRow = require('./timesheet.row');
    element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} />);
  });

  it('should instantiate the TimesheetRow', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', function () {
    describe('when the timesheet is deleted', function () {
      it('should display an error in the snackbar', function () {

      });
    });

    describe('when the timesheet is NOT deleted', function () {
      it('should set the timesheet on the stored state', function () {

      });

      it('should transition to the detail route', function () {

      });
    });
  });

  describe('clicking the remove button', function () {
    it('should set the timesheet to deleted', function () {

    });

    it('should fire a remove timesheet action', function () {

    });

    it('should fade the row', function () {

    });

    it('should change the button to a restore button', function () {

    });
  });

  describe('clicking the restore button', function () {
    it('should set the timesheet to restored', function () {

    });

    it('should fire a restore timesheet action', function () {
      
    });

    it('should un-fade the row', function () {

    });

    it('should change the button back to a delete button', function () {
      
    });
  });
});
