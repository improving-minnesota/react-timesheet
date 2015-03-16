describe('Project Row Component: ', function () {

  var ProjectRow,
    project,
    element,
    spies = {},
    button;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    ProjectRow = require('./project.row');
  });

  it('should instantiate the ProjectRow', function () {
    element = TestUtils.renderIntoDocument(<ProjectRow project={{_id: 1}} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
