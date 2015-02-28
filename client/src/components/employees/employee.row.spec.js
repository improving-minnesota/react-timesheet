jest.dontMock('./employee.row');

describe('Employee Row Component: ', function () {

  var EmployeeRow;

  beforeEach(function () {
    EmployeeRow = require('./employee.row');
  });

  it('should instantiate the EmployeeRow', function () {
    expect(EmployeeRow).toBeDefined();
  });
});
