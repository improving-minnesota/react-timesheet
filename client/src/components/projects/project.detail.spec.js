var _ = require('lodash');
var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');

describe('Project Detail Component: ', function () {

  var ProjectDetail,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './project.form': mockComponent('ProjectForm'),
      '../../actions/project.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams: function () {return {_id: 'abc123'}}
        }
      }
    };

    ProjectDetail = proxyquire('./project.detail', proxies);
    element = TestUtils.renderIntoDocument(<ProjectDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(function () {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the ProjectDetail', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the project', function () {
    describe('and the project exists on the store state', function () {
      beforeEach(function () {
        element.store.state.project = {_id: 'abc123'};
        element.get();
      });

      it('should set the project on the component state', function () {
        expect(element.state.project._id).to.equal('abc123');
      });
    });

    describe('and the project does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get();
      });

      it('should fire a get project action', function () {
        expect(proxies['../../actions/project.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an project', function () {
    beforeEach(function () {
      element.saveProject({preventDefault: _.noop});
    });

    it('should validate the entire project', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the project passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/project.actions'].update).to.have.been.called;
      });

      it('should transition back to the project list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('projects');
      });
    });
  });
});
