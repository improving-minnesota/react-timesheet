describe('Employee Create Component: ', function () {

  var EmployeeCreate;

  beforeEach(function () {
    EmployeeCreate = require('./employee.create');
  });

  it('should instantiate the EmployeeCreate', function () {
    expect(EmployeeCreate).to.be.defined;
  });
});
