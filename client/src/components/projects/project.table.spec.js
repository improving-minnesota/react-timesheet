var _ = require('lodash');

describe('Project Table Component: ', function () {

  var ProjectTable,
    projects,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    projects = [{}, {}];

    ProjectTable = require('./project.table');
    element = TestUtils.renderIntoDocument(
      <ProjectTable projects={projects} />
    );
  });

  it('should instantiate the ProjectTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
