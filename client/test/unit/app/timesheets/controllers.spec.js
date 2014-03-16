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

        $httpBackend.when('GET', '/users/all/timesheets').respond(200, [{name: 'testTimesheet'}]);
      });

      describe('during setup', function () {
        it('should be able to instantiate the controller and request a page of timesheets', function () { 
          expect(controller).to.be.ok; 
          // $scope.requestTimesheets is called upon controller creation
          $httpBackend.expect('GET', '/users/all/timesheets');
          $httpBackend.flush();
        });
      }); 

      describe('requesting timesheets', function () {
        it('should set the result to the timesheets', function () {
          $httpBackend.expect('GET', '/users/all/timesheets');
          $scope.requestTimesheets();
          $httpBackend.flush();
          expect($scope.timesheets[0].name).to.equal("testTimesheet");
        });
      });

      describe('removing a timesheet', function () {

        it('should send a remove request for the specified timesheet', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
          $scope.remove(timesheet);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
          });

          it('should set the timesheet to deleted for the ui', function () {
            $scope.remove(timesheet);
            $httpBackend.flush();
            expect(timesheet.deleted).to.be.true;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(500);
          });

          it('should set deleted to false for the timesheet in the ui', function () {
            $scope.remove(timesheet);
            $httpBackend.flush();
            expect(timesheet.deleted).to.be.false;
          });
        });

      });

      describe('restore', function () {
        beforeEach(function () {
          timesheet.deleted = true;
        });

        it('should send a restore request for the specified timesheet', function () {
          $httpBackend.flush();
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
          $scope.restore(timesheet);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
          });

          it('should set the timesheet to not deleted for the ui', function () {
            $scope.restore(timesheet);
            $httpBackend.flush();
            expect(timesheet.deleted).to.be.false;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.flush();
            $httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(500);
          });

          it('should set deleted to true for the timesheet in the ui', function () {
            $scope.restore(timesheet);
            $httpBackend.flush();
            expect(timesheet.deleted).to.be.true;
          });
        });
      });
    });
  });
});
