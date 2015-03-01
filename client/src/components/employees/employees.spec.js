var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Employees Component: ', function () {

  var Employees;

  beforeEach(function () {
    Employees = require('./employees');
  });

  it('should instantiate the Employees', function () {
    expect(Employees).to.be.defined;
  });
});
