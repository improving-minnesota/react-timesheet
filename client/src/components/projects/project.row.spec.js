var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Project Row Component: ', function () {

  var ProjectRow,
    project,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    spies = {

    };

    project = {
      _id: '54321',
      name: 'projectOne',
      description: 'project one description'
    };

    ProjectRow = require('./project.row');
    element = TestUtils.renderIntoDocument(<ProjectRow project={project}/>);
  });

  it('should instantiate the ProjectRow', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', function () {
    describe('when the project is deleted', function () {
      it('should display an error in the snackbar', function () {

      });
    });

    describe('when the project is NOT deleted', function () {
      it('should set the project on the stored state', function () {

      });

      it('should transition to the detail route', function () {

      });
    });
  });

  describe('clicking the remove button', function () {
    it('should set the project to deleted', function () {

    });

    it('should fire a remove project action', function () {

    });

    it('should fade the row', function () {

    });

    it('should change the button to a restore button', function () {

    });
  });

  describe('clicking the restore button', function () {
    it('should set the project to restored', function () {

    });

    it('should fire a restore project action', function () {
      
    });

    it('should un-fade the row', function () {

    });

    it('should change the button back to a delete button', function () {
      
    });
  });
});
