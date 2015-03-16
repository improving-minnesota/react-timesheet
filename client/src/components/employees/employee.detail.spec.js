var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');

describe('Employee Detail Component: ', function () {

  var EmployeeDetail,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './employee.form': mockComponent('EmployeeForm'),
      '../../actions/employee.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams: function () {return {_id: 'abc123'}}
        }
      }
    };

    EmployeeDetail = proxyquire('./employee.detail', proxies);
    element = TestUtils.renderIntoDocument(<EmployeeDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the EmployeeDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the employee', function () {
    describe('and the employee exists on the store state', function () {
      beforeEach(function () {
        element.store.state.employee = {_id: 'abc123'};
        element.get();
      });

      it('should set the employee on the component state', function () {
        expect(element.state.employee._id).to.equal('abc123');
      });
    });

    describe('and the employee does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get();
      });

      it('should fire a get employee action', function () {
        expect(proxies['../../actions/employee.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an employee', function () {
    beforeEach(function () {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the employee passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/employee.actions'].update).to.have.been.called;
      });

      it('should transition back to the employee list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
});
