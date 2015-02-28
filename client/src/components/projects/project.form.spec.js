var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Project Form Component: ', function () {

  var ProjectForm;

  beforeEach(function () {
    ProjectForm = require('./project.form');
  });

  it('should instantiate the ProjectForm', function () {
    expect(ProjectForm).to.be.defined;
  });
});
