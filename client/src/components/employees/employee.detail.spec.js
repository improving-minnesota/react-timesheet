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

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
    // spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    // spies.transitionTo.restore();
    // spies.validateAll.restore();
  });

  it('should instantiate the EmployeeDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test me
});
