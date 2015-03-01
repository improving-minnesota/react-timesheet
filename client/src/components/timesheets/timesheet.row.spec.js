var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timesheet Row Component: ', function () {

  var TimesheetRow;

  beforeEach(function () {
    TimesheetRow = require('./timesheet.row');
  });

  it('should instantiate the TimesheetRow', function () {
    expect(TimesheetRow).to.be.defined;
  });
});
