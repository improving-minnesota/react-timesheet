describe('Timesheet Store: ', function () {

  var TimesheetStore;

  beforeEach(function () {
    TimesheetStore = require('./timesheet.store');
  });

  it('should instantiate the TimesheetStore', function () {
    expect(TimesheetStore).to.be.defined;
  });
});
