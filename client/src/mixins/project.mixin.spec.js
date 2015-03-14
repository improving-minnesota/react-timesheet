describe('Project Mixin: ', function () {

  var Project;

  beforeEach(function () {
    Project = require('./project.mixin');
  });

  it('should instantiate the Project', function () {
    expect(Project).to.be.defined;
  });
});
