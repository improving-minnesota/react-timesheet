jest.dontMock('./project.actions');

describe('Project actions: ', function () {

  var ProjectActions;

  beforeEach(function () {
    ProjectActions = require('./project.actions');
  });

  it('should instantiate the ProjectActions', function () {
    expect(ProjectActions).toBeDefined();
  });
});
