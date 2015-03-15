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

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
    // spies.validateAll = sinon.stub(element, 'validateAll');
    spies.create = sinon.stub(EmployeeActions, 'create');
  });

  afterEach(function () {
    // spies.validateAll.restore();
    // spies.transitionTo.restore();
    spies.create.restore();
  });

  it('should instantiate the EmployeeCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - test me 
});
