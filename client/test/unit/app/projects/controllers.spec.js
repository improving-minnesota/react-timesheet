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

    // TODO : inject the $state and $stateParams services and assign them to the spec's variables
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {

      spies = {
        // TODO : create a test stub for the $state service
      };

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

          // TODO : inject the spies.state and $stateParams into the test controller 
        });
        
        $httpBackend.when('GET', '/projects').respond(200, [{name: 'project1'}]);
      });

      describe('during setup', function () {
        it('should be able to instantiate the controller and request a page of projects', function () { 
          expect(controller).to.be.ok; 
          // $scope.requestProjects is called upon controller creation
          $httpBackend.expect('GET', '/projects');
          $httpBackend.flush();
        });
      }); 

      describe('requesting projects', function () {
        it('should set the result to the projects', function () {
          $httpBackend.expect('GET', '/projects');
          $scope.requestProjects();
          $httpBackend.flush();
          expect($scope.projects[0].name).to.equal("project1");
        }); 
      });

      describe('showing project detail', function () {

        // TODO : verify it should transition to the project detail state

      });

      describe('creating a new project', function () {

        // TODO : verify it should transition to the create project state

      });

      describe('removing a project', function () {

        it('should send a remove request for the specified project', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/projects/' + project._id).respond(200);
          $scope.remove(project);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/projects/' + project._id).respond(200);
          });

          it('should set the project to deleted for the ui', function () {
            $scope.remove(project);
            $httpBackend.flush();
            expect(project.deleted).to.be.true;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/projects/' + project._id).respond(500);
          });

          it('should set deleted to false for the project in the ui', function () {
            $scope.remove(project);
            $httpBackend.flush();
            expect(project.deleted).to.be.false;
          });
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          project.deleted = true;
        });

        it('should send a restore request for the specified project', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/projects/' + project._id).respond(200);
          $scope.restore(project);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/projects/' + project._id).respond(200);
          });

          it('should set the project to not deleted for the ui', function () {
            $scope.restore(project);
            $httpBackend.flush();
            expect(project.deleted).to.be.false;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/projects/' + project._id).respond(500);
          });

          it('should set deleted to true for the project in the ui', function () {
            $scope.restore(project);
            $httpBackend.flush();
            expect(project.deleted).to.be.true;
          });
        });
      });

      describe('cancel', function () {

        // TODO : verify it should return back to the project list

      });

    });

    describe('ProjectDetailCtrl', function() {
      
      beforeEach(function() {
        // TODO : set the saveText on the data of the current state to 'update'

        $scope = $rootScope.$new();
        controller = $controller("ProjectDetailCtrl", {
          $scope: $scope,
          project: new $api.projects(project)

          // TODO : inject the spies.state and $stateProvider into the test controller
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        // TODO : verify it should set the project on scope to the resolved project

      });

      describe('Saving an edited project', function () {
        var updatedProject;

        beforeEach(function () {
          updatedProject = angular.extend(project, {name: 'updated project'});
          $httpBackend.expect('PUT', '/projects/' + project._id);
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('PUT', '/projects/' + project._id).respond(200, updatedProject);
          });

          // TODO : verify it should set the project on scope to be the updated project

        });

      });
    });

    describe('ProjectCreateCtrl', function() {

      beforeEach(function() {
        // TODO : set the saveText on the data of the current state to 'create'

        $scope = $rootScope.$new();
        controller = $controller("ProjectCreateCtrl", {
          $scope: $scope

          // TODO : inject spies.state and $stateParams into the test controller
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        // TODO : verify it should set the project on scope to an empy object

      }); 

      describe('saving a new project', function () {

        beforeEach(function () {
          $httpBackend.expect('POST', '/projects');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('POST', '/projects').respond(200, project);
          });

          // TODO : verify it should transition to the detail page of the created project
          
        });
      });

    });

  });
});