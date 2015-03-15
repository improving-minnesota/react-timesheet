var _ = require('lodash');

describe('Employee Create Component: ', function () {

  var EmployeeCreate,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    EmployeeCreate = require('./employee.create');
    EmployeeActions = require('../../actions/employee.actions');

    element = TestUtils.renderIntoDocument(<EmployeeCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
    spies.create = sinon.stub(EmployeeActions, 'create');
  });

  afterEach(function () {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
  });

  it('should instantiate the EmployeeCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an employee', function () {
    beforeEach(function () {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the employee passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the employee list', function () {
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
});
