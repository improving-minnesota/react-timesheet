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

  describe('clicking the remove button', function () {
    beforeEach(function () {
      project = {
        _id: 'abc123',
        name: 'projectTwo',
        deleted: false
      };

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the project to deleted', function () {
      expect(element.props.project.deleted).to.be.true;
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      project = {
        _id: 'abc123',
        name: 'projectThree',
        deleted: true
      };

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    it('should set the project to restored', function () {
      expect(element.props.project.deleted).to.be.false;
    });
  });
});
