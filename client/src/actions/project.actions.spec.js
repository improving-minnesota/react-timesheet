describe('Project actions: ', function () {

  var ProjectActions,
    dispatcher,
    query,
    payload,
    project = 'project';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    ProjectActions = require('./project.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the ProjectActions', function () {
    expect(ProjectActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      ProjectActions.list(query);

      payload = {query: query, actionType: ProjectActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      ProjectActions.get(id);

      payload = {project: {_id: id}, actionType: ProjectActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      ProjectActions.create(project);

      payload = {project: project, actionType: ProjectActions.CREATE};
    });

    it('should dispatch a view action with the project and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      ProjectActions.update(project);

      payload = {project: project, actionType: ProjectActions.UPDATE};
    });

    it('should dispatch a view action with the project and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      ProjectActions.remove(project);

      payload = {project: project, actionType: ProjectActions.DELETE};
    });

    it('should dispatch a view action with the project and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      ProjectActions.restore(project);

      payload = {project: project, actionType: ProjectActions.RESTORE};
    });

    it('should dispatch a view action with the project and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
