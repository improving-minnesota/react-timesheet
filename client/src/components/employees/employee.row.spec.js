var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Employee Row Component: ', function () {

  var EmployeeRow,
    employee,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    employee = {
      username: 'username',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      admin: true
    };

    EmployeeRow = require('./employee.row');
    element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} />);
  });

  it('should instantiate the EmployeeRow', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', function () {
    describe('when the employee is deleted', function () {
      it('should display an error in the snackbar', function () {

      });
    });

    describe('when the employee is NOT deleted', function () {
      it('should set the employee on the stored state', function () {

      });

      it('should transition to the detail route', function () {

      });
    });
  });

  describe('clicking the remove button', function () {
    it('should set the employee to deleted', function () {

    });

    it('should fire a remove employee action', function () {

    });

    it('should fade the row', function () {

    });

    it('should change the button to a restore button', function () {

    });
  });

  describe('clicking the restore button', function () {
    it('should set the employee to restored', function () {

    });

    it('should fire a restore employee action', function () {
      
    });

    it('should un-fade the row', function () {

    });

    it('should change the button back to a delete button', function () {
      
    });
  });
});
