describe('Employee Store: ', function () {

  var EmployeeStore;

  beforeEach(function () {
    EmployeeStore = require('./employee.store');
  });

  it('should instantiate the EmployeeStore', function () {
    expect(EmployeeStore).to.be.defined;
  });
});
