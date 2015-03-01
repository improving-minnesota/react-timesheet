var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timesheet Table Component: ', function () {

  var TimesheetTable;

  beforeEach(function () {
    TimesheetTable = require('./timesheet.table');
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TimesheetTable).to.be.defined;
  });
});
