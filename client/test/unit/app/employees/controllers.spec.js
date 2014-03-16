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

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {

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
        });
        
        // TODO : using mock httpBackend, set up a response for calls to get a list of employees

      });

      describe('during setup', function () {

        // TODO : verify it should be able to instantiate the controller and request a page of employees

      }); 

      describe('requesting employees', function () {

        // TODO : verify it should set the result to the employees

      });

      describe('removing a employee', function () {

        // TODO : verify it should send a remove request for the specified employee

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a successful response for when a PUT is sent to soft delete an employee
          });

          // TODO : verify it should set the employee to deleted for the ui

        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            
            // TODO : set up an errored response for a PUT to soft delete an employee
          });

          // TODO : verify it should set deleted to false for the employee in the ui
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          employee.deleted = true;
        });

        // TODO : verify it should send a restore request for the specified employee

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a successful response for a request to restore an employee
          });

          // TODO : verify it should set the employee to not deleted for the ui
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 500 response for when a request is sent to restore an employee
          });

          // TODO : verify it should set deleted to true for the employee in the ui
        });
      });

    });

  });
});
