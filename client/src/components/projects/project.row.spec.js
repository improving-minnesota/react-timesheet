describe('Project Row Component: ', function () {

  var ProjectRow,
    ProjectActions,
    ProjectStore,
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
    ProjectStore = require('../../stores/project.store');
    ProjectRow = require('./project.row');
    ProjectActions = require('../../actions/project.actions');
  });

  it('should instantiate the ProjectRow', function () {
    element = TestUtils.renderIntoDocument(<ProjectRow project={{_id: 1}} store={ProjectStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the remove button', function () {
    beforeEach(function () {
      project = {
        _id: 'abc123',
        name: 'projectTwo',
        deleted: false
      };

      spies.remove = sinon.stub(ProjectActions, 'remove');

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.remove.restore();
    });

    it('should set the project to deleted', function () {
      expect(element.props.project.deleted).to.be.true;
    });

    it('should fire a remove project action', function () {
      expect(spies.remove).to.have.been.calledWith(project);
    });
  });

  describe('clicking the restore button', function () {
    beforeEach(function () {
      project = {
        _id: 'abc123',
        name: 'projectThree',
        deleted: true
      };

      spies.restore = sinon.stub(ProjectActions, 'restore');

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(function () {
      spies.restore.restore();
    });

    it('should set the project to restored', function () {
      expect(element.props.project.deleted).to.be.false;
    });

    it('should fire a restore project action', function () {
      expect(spies.restore).to.have.been.calledWith(project);
    });
  });
});
