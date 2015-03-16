var _ = require('lodash');

describe('Project Table Component: ', function () {

  var ProjectTable,
    ProjectStore,
    projects,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    ProjectStore = require('../../stores/project.store');
  });

  beforeEach(function () {
    projects = [{}, {}];

    ProjectTable = require('./project.table');
    element = TestUtils.renderIntoDocument(
      <ProjectTable projects={projects} store={ProjectStore} />
    );
  });

  it('should instantiate the ProjectTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
