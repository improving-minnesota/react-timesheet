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

  describe('clicking the row', function () {
    describe('when the project is deleted', function () {
      beforeEach(function () {
        project = {
          _id: 'abc123',
          deleted: true
        };

        element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
        element.showDetail();
      });
    });

    describe('when the project is NOT deleted', function () {
      beforeEach(function () {
        project = {
          _id: 'abc123',
          name: 'projectOne',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(function () {
        spies.transitionTo.restore();
      });

      it('should set the project on the stored state', function () {
        expect(element.props.store.getState().project.name).to.equal('projectOne');
      });

      it('should transition to the detail route', function () {
        expect(spies.transitionTo).to.have.been.calledWith('projects.detail', {_id: 'abc123'});
      });
    });
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
