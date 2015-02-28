var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Project actions: ', function () {

  var ProjectActions;

  beforeEach(function () {
    ProjectActions = require('./project.actions');
  });

  it('should instantiate the ProjectActions', function () {
    expect(ProjectActions).to.be.defined;
  });
});
