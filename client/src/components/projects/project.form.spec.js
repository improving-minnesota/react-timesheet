var _ = require('lodash');

describe('Project Form Component: ', function () {

  var ProjectForm,
    CancleButton,
    project,
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
    project =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    ProjectForm = require('./project.form');
    element = TestUtils.renderIntoDocument(
      <ProjectForm project={project}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the ProjectForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', function () {
    it('should go back to the projects home', function () {
      var cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      var button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('projects');
    });
  });
});
