describe('Project Store: ', function () {

  var ProjectStore;

  beforeEach(function () {
    ProjectStore = require('./project.store');
  });

  it('should instantiate the ProjectStore', function () {
    expect(ProjectStore).to.be.defined;
  });
});
