describe('Timesheet Mixin: ', function () {
  
  var Timesheet;

  beforeEach(function () {
    Timesheet = require('./timesheet.mixin');
  });

  it('should instantiate the Timesheet', function () {
    expect(Timesheet).to.be.defined;
  });
});
