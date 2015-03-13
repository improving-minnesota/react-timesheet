var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Project Table Component: ', function () {

  var ProjectTable,
    projects,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './project.row': mock.mockComponent()
    };

    projects = [{}, {}];

    ProjectTable = proxyquire('./project.table', proxies);
    element = TestUtils.renderIntoDocument(<ProjectTable projects={projects} />);
  });

  it('should instantiate the ProjectTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
