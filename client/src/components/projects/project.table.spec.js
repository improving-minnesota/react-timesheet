var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Project Table Component: ', function () {

  var ProjectTable;

  beforeEach(function () {
    ProjectTable = require('./project.table');
  });

  it('should instantiate the ProjectTable', function () {
    expect(ProjectTable).to.be.defined;
  });
});
