var _ = require('lodash');

describe('Employee Form Component: ', function () {

  var EmployeeForm,
    CancleButton,
    employee,
    errors, 
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    CancelButton = require('../common/buttons/cancel.button');
  });

  beforeEach(function () {
    employee =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    EmployeeForm = require('./employee.form');
    element = TestUtils.renderIntoDocument(
      <EmployeeForm employee={employee}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    // spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    // spies.transitionTo.restore();
  });

  it('should instantiate the EmployeeForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - Test the Cancel Button 
});
