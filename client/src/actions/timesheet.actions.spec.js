describe('Timesheet actions: ', function () {

  var TimesheetActions;

  beforeEach(function () {
    TimesheetActions = require('./timesheet.actions');
  });

  it('should instantiate the TimesheetActions', function () {
    expect(TimesheetActions).to.be.defined;
  });
});
