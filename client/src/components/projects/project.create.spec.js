var _ = require('lodash');

describe('Project Create Component: ', function () {

  var ProjectCreate,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    ProjectCreate = require('./project.create');
    ProjectActions = require('../../actions/project.actions');

    element = TestUtils.renderIntoDocument(<ProjectCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo', _.noop);
    spies.validateAll = sinon.stub(element, 'validateAll', _.noop);
    spies.create = sinon.stub(ProjectActions, 'create', _.noop);
  });

  afterEach(function () {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
  });

  it('should instantiate the ProjectCreate', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an project', function () {
    beforeEach(function () {
      element.saveProject({preventDefault: _.noop});
    });

    it('should validate the entire project', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the project passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the project list', function () {
        expect(spies.transitionTo).to.have.been.calledWith('projects');
      });
    });
  });
});
