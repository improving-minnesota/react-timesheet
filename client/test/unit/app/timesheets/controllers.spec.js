describe('Timesheets', function() {

  var expect = chai.expect;
  var $rootScope,
    $controller,
    $httpBackend,
    $state,
    $stateParams,
    $scope,
    $api,
    controller, 
    timesheet,
    timeunits,
    employee,
    spies;
 
  describe('Controllers', function() {
      
    beforeEach(
      module(
        'app.resources',
        'ngResource',
        'app.timesheets',
        'app.timesheets.controllers'
      ));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {

      timesheet = {
        "_id": "asdfghjklqwerty",
        "name": "TestTimesheet",
        "beginDate": "2013-11-18",
        "endDate": "2013-11-24",
        "description": "Test timesheet for testing",
        "user_id": "1234567890"
      };

      timeunits = [
        {"_id": "aaaaaaaaaa", "dateWorked": "2013-11-18", "hoursWorked": 8, "project": "Project1"},
        {"_id": "bbbbbbbbbb", "dateWorked": "2013-11-19", "hoursWorked": 8, "project": "Project1"},
        {"_id": "cccccccccc", "dateWorked": "2013-11-20", "hoursWorked": 8, "project": "Project1"},
        {"_id": "dddddddddd", "dateWorked": "2013-11-21", "hoursWorked": 8, "project": "Project2"},
        {"_id": "eeeeeeeeee", "dateWorked": "2013-11-22", "hoursWorked": 8, "project": "Project1"}
      ];

    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('TimesheetCtrl', function() {

      beforeEach(function() {
        $scope = $rootScope.$new();
        controller = $controller("TimesheetCtrl", { 
          $scope: $scope
        });

        // TODO : set up a response for api calls to get a list of timesheets
      });

      describe('during setup', function () {

        // TODO : verify it should be able to instantiate the controller and request a page of timesheets

      }); 

      describe('requesting timesheets', function () {

        // TODO : verify it should set the result to the timesheets

      });

      describe('removing a timesheet', function () {

        // TODO : verify it should send a remove request for the specified timesheet

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 200 response for a request to remove a timesheet
          });

          // TODO : verify it should set the timesheet to deleted for the ui

        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            // TODO : set up a 500 response for a request to remove a timesheet
          });

          // TODO : verify it should set deleted to false for the timesheet in the ui

        });

      });

      describe('restore', function () {
        beforeEach(function () {
          timesheet.deleted = true;
        });

        // TODO : verify it should send a restore request for the specified timesheet

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 200 response for a request to restore a timesheet
          });

          // TODO : verify it should set the timesheet to not deleted for the ui

        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();

            // TODO : set up a 500 response for a request to restore a timesheet
          });

          // TODO : verify it should set deleted to true for the timesheet in the ui
          
        });
      });
    });
  });
});
