var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employee Form Component: ', function () {

  var EmployeeForm,
    employee,
    errors,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {
      validate: sinon.stub(),
      hasErrors: sinon.stub(),
      toggleAdmin: sinon.stub()
    };

    employee = {
      _id: '12345',
      username: 'username',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      admin: true
    };

    errors  = {};

    EmployeeForm = require('./employee.form');
    element = TestUtils.renderIntoDocument(
      <EmployeeForm employee={employee} 
        errors={errors} 
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin} />
    );
  });

  it('should instantiate the EmployeeForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', function () {
    it('should return to the employees route', function () {
      
    });
  });
});
