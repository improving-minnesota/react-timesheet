var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Project Row Component: ', function () {

  var ProjectRow;

  beforeEach(function () {
    ProjectRow = require('./project.row');
  });

  it('should instantiate the ProjectRow', function () {
    expect(ProjectRow).to.be.defined;
  });
});
