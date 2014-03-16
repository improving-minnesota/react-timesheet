describe('Employees', function() {

  var expect = chai.expect;
  var $rootScope,
    $controller,
    $httpBackend,
    $state,
    $stateParams,
    $scope,
    $api,
    controller, 
    employee,
    spies;
 
  describe('Controllers:', function() {
      
    beforeEach(
      module(
        'ngResource',
        'app.resources',
        'app.employees',
        'app.employees.controllers'
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
        // TODO : set up a sinon test stub on $state service
      };

      employee = {
        "_id": "1234567890",
        "username": "test", 
        "email": "test@test.com", 
        "password": "password", 
        "admin": true, 
        "firstName": "Test", 
        "lastName": "User"
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('EmployeeCtrl', function() {

      beforeEach(function() {
        $scope = $rootScope.$new();
        controller = $controller("EmployeeCtrl", { 
          $scope: $scope

          // TODO : inject spies.state and $stateParams into the test controller
        });

        $httpBackend.when('GET', '/users').respond(200, [{username: 'testUser'}]);
      });

      describe('during setup', function () {
        it('should be able to instantiate the controller and request a page of employees', function () { 
          expect(controller).to.be.ok; 
          // $scope.requestEmployees is called upon controller creation
          $httpBackend.expect('GET', '/users');
          $httpBackend.flush();
        });
      }); 

      describe('requesting employees', function () {

        it('should set the result to the employees', function () {
          $httpBackend.expect('GET', '/users');
          $scope.requestEmployees();
          $httpBackend.flush();
          expect($scope.employees[0].username).to.equal("testUser");
        }); 

      });

      describe('showing employee detail', function () {
        
        // TODO : verify it should transition to the employee detail state
        // TODO : verify it should transition to the create employee state

      });

      describe('removing a employee', function () {

        it('should send a remove request for the specified employee', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
          $scope.remove(employee);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200);
          });

          it('should set the employee to deleted for the ui', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.true;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(500);
          });

          it('should set deleted to false for the employee in the ui', function () {
            $scope.remove(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.false;
          });
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          employee.deleted = true;
        });

        it('should send a restore request for the specified employee', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
          $scope.restore(employee);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200);
          });

          it('should set the employee to not deleted for the ui', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.false;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/' + employee._id).respond(500);
          });

          it('should set deleted to true for the employee in the ui', function () {
            $scope.restore(employee);
            $httpBackend.flush();
            expect(employee.deleted).to.be.true;
          });
        });
      });

      describe('cancel', function () {

        // TODO : verify it should return back to the employee list

      });

    });

    describe('EmployeeDetailCtrl', function() {
      
      beforeEach(function() {
        // TODO : set the saveText on the data of the current state to 'update'

        $scope = $rootScope.$new();
        controller = $controller("EmployeeDetailCtrl", {
          $scope: $scope,
          employee: new $api.employees(employee)

          // TODO : inject the spies.state and $stateProvider into the test controller
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        // TODO : verify it should set the employee on scope to the resolved employee

      });

      describe('Saving an edited employee', function () {
        var updatedEmployee;

        beforeEach(function () {
          updatedEmployee = angular.extend(employee, {username: 'updated'});
          $httpBackend.expect('PUT', '/users/' + employee._id);
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('PUT', '/users/' + employee._id).respond(200, updatedEmployee);
          });

          // TODO : verify it should set the employee on scope to be the updated employee

        });

      });
    });

    describe('EmployeeCreateCtrl', function() {

      beforeEach(function() {
        // TODO : set the saveText on the data of the current state to 'create'

        $scope = $rootScope.$new();
        controller = $controller("EmployeeCreateCtrl", {
          $scope: $scope

          // TODO : inject the spies.state and $stateParams into the test controller

        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        // TODO : verify it should set the employee on scope to a non admin user

      }); 

      describe('saving a new employee', function () {

        beforeEach(function () {
          $httpBackend.expect('POST', '/users');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('POST', '/users').respond(200, employee);
          });

          // TODO : verify it should transition to the detail page of the created employee
          
        });
      });

    });

  });
});
