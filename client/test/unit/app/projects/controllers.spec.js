describe('Projects', function() {

  var expect = chai.expect;
  var $rootScope,
    $controller,
    $httpBackend,
    $state,
    $stateParams,
    $scope,
    $api,
    controller, 
    project,
    spies;
 
  describe('Controllers:', function() {
      
    beforeEach(
      module(
        'app.resources',
        'ngResource',
        'app.projects',
        'app.projects.controllers'
      ));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {

      project = {
        "_id": "abcdefghijklmnop",
        "name": "Project2", 
        "description": "This is your second project"
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('ProjectCtrl', function() {

      beforeEach(function() {
        $scope = $rootScope.$new();
        controller = $controller("ProjectCtrl", { 
          $scope: $scope
        });
        
        // TODO : set up a response for retrieving a list of projects
      });

      describe('during setup', function () {

        // TODO : verify it should be able to instantiate the controller and request a page of projects

      }); 

      describe('requesting projects', function () {
        
        // TODO : verify it should set the result to the projects
      });

      describe('removing a project', function () {

        // TODO : verify it should send a remove request for the specified project

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 200 response for a request to remove a project
          });

          // TODO : verify it should set the project to deleted for the ui

        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 500 response for a request to remove a project
          });

          // TODO : verify it should set deleted to false for the project in the ui
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          project.deleted = true;
        });

        // TODO : verify it should send a restore request for the specified project

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 200 response for a request to restore a project
          });

          // TODO : verify it should set the project to not deleted for the ui
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 500 response for a request to restore a project
          });

          // TODO : verify it should set deleted to true for the project in the ui
        });
      });
    });
  });
});