var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timesheet Edit Component: ', function () {

  var TimesheetEdit;

  beforeEach(function () {
    TimesheetEdit = require('./timesheet.edit');
  });

  it('should instantiate the TimesheetEdit', function () {
    expect(TimesheetEdit).to.be.defined;
  });
});
