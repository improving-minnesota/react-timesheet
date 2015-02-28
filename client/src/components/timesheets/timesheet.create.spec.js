describe('Timesheet Create Component: ', function () {

  var TimesheetCreate;

  beforeEach(function () {
    TimesheetCreate = require('./timesheet.create');
  });

  it('should instantiate the TimesheetCreate', function () {
    expect(TimesheetCreate).to.be.defined;
  });
});
