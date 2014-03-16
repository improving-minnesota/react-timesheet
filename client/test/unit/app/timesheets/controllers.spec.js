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
        'app.timesheets.timeunits',
        'app.timesheets',
        'app.timesheets.controllers'
      ));

    // TODO : inject the $state and $stateParams services and assign them to the spec's variables
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {
      // TODO : assign a test user_id "1234567890" to $stateParams 

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

      spies = {
        // TODO : set up a sinon test stub on $state service
      };
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
          // TODO : assign the stubbed $state and $stateParams to be injected in your test controller
        });

        // TODO : change the path here to expect $stateParams.user_id between users and timesheets
        $httpBackend.when('GET', '/users/timesheets').respond(200, [{name: 'testTimesheet'}]);
      });

      describe('during setup', function () {
        it('should be able to instantiate the controller and request a page of timesheets', function () { 
          expect(controller).to.be.ok; 
          // $scope.requestTimesheets is called upon controller creation

          // TODO : change the path here to expect $stateParams.user_id between users and timesheets
          $httpBackend.expect('GET', '/users/timesheets');
          $httpBackend.flush();
        });
      }); 

      describe('requesting timesheets', function () {
        it('should set the result to the timesheets', function () {

          // TODO : change the path here to expect $stateParams.user_id between users and timesheets
          $httpBackend.expect('GET', '/users/timesheets');
          $scope.requestTimesheets();
          $httpBackend.flush();
          expect($scope.timesheets[0].name).to.equal("testTimesheet");
        });
      });

      describe('showing timesheet detail', function () {
        
        // TODO : verify it should transition to the timesheet detail state

      });

      describe('creating a new timesheet', function () {

        // TODO : verify it should transition to the create timesheet state

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

    describe('TimesheetDetailCtrl', function() {
      var timeunit;
      
      beforeEach(function() {

        $scope = $rootScope.$new();
        controller = $controller("TimesheetDetailCtrl", {
          $scope: $scope,
          timesheet: new $api.timesheets(timesheet),
          timeunits: timeunits

          // TODO : inject the spies.state and $stateParams into your test controller
        });

        timeunit = angular.extend(timeunits[0], {user_id: '1234567890', timesheet_id: timesheet._id});
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set the timesheet on scope to the resolved timesheet

      });

      describe('edit', function () {

        // TODO : verify it should transition to the edit state

      });

      describe('cancel', function () {

        // TODO : verify it should return back to the timesheet list

      });

      describe('logTime', function () {

        // TODO : verify it should transition to the create timeunits state

      });

      describe('showTimeunitDetail', function () {

        // TODO : verify it should set the timeunit_id on state params and transistion to the edit timeunits state

      }); 

      describe('removeTimeunit', function () {
        it('should send a remove request for the specified timeunit', function () {
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(200);
          $scope.removeTimeunit(timeunit);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(200);
          });

          it('should set the timeunit to deleted for the ui', function () {
            $scope.removeTimeunit(timeunit);
            $httpBackend.flush();
            expect(timeunit.deleted).to.be.true;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(500);
          });

          it('should set deleted to false for the timeunit in the ui', function () {
            $scope.removeTimeunit(timeunit);
            $httpBackend.flush();
            expect(timeunit.deleted).to.be.false;
          });
        });
      });

      describe('restoreTimeunit', function () {
        beforeEach(function () {
          timeunit.deleted = true;
        });

        it('should send a restore request for the specified timeunit', function () {
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(200);
          $scope.restoreTimeunit(timeunit);
          $httpBackend.flush();
        });

        describe('successfully', function () {
          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(200);
          });

          it('should set the timeunit to not deleted for the ui', function () {
            $scope.restoreTimeunit(timeunit);
            $httpBackend.flush();
            expect(timeunit.deleted).to.be.false;
          });
        });

        describe('in error', function () {
          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(500);
          });

          it('should set deleted to true for the timeunit in the ui', function () {
            $scope.restoreTimeunit(timeunit);
            $httpBackend.flush();
            expect(timeunit.deleted).to.be.true;
          });
        });
      });
    });

    describe('TimesheetEditCtrl', function() {
      beforeEach(function() {
        // TODO : set the saveText on the stubbed state to 'update'

        $scope = $rootScope.$new();
        controller = $controller("TimesheetEditCtrl", {
          $scope: $scope,
          timesheet: new $api.timesheets(timesheet)
          // TODO : set the spies.state stub to be injected into the test controller
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        // TODO : verify it should set the timesheet on scope to the resolved timesheet
      });

      describe('Saving an edited timesheet', function () {
        var updatedTimesheet;

        beforeEach(function () {
          updatedTimesheet = angular.extend(timesheet, {name: 'updated'});
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/' + timesheet._id);
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200, updatedTimesheet);
          });

          // TODO : verify it should set the timesheet on scope to be the updated timesheet

        });

      });

      describe('cancel', function () {

        // TODO : verify it should return back to the timesheet detail

      });
    });

    describe('TimesheetCreateCtrl', function() {

      beforeEach(function() {
        // TODO : set the saveText on the spies.state.current.data to 'create'

        $scope = $rootScope.$new();
        controller = $controller("TimesheetCreateCtrl", {
          $scope: $scope
          // TODO : inject the spies.state and $stateParams into the test controller
        });
      });

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set saveText to the current state saveText
        
        it('should set the timesheet on scope to an empty object', function () {
          expect($scope.timesheet).to.be.empty;
        });
      }); 

      describe('saving a new timesheet', function () {

        beforeEach(function () {
          $httpBackend.expect('POST', '/users/1234567890/timesheets');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('POST', '/users/1234567890/timesheets').respond(200, timesheet);
          });

          // TODO : verify it should transition to the detail page of the created timesheet

        });
      });

      describe('cancel', function () {

        // TODO : verify it should return back to the timesheet list

      });

    });

  });
});
