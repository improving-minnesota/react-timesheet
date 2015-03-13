var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  mock = require('../mock');

describe('Project Form Component: ', function () {

  var ProjectForm,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {
      validate: sinon.stub(),
      hasErrors: sinon.stub()
    };

    project = {
      _id: '54321',
      name: 'projectOne',
      description: 'project one description'
    };

    errors = {};

    ProjectForm = require('./project.form');
    element = TestUtils.renderIntoDocument(
      <ProjectForm project={project}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}/>
    );
  });

  it('should instantiate the ProjectForm', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
