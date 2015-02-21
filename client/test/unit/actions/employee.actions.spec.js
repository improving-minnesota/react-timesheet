jest.dontMock('../../../src/actions/employee.actions');

describe('Employee actions: ', function () {

  var EmployeeActions;

  beforeEach(function () {
    EmployeeActions = require('../../../src/actions/employee.actions');
  });

  it('should instantiate the EmployeeActions', function () {
    expect(EmployeeActions).toBeDefined();
  });
});
