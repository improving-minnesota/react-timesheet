describe('Timeunits', function() {

  var expect = chai.expect;
  var $rootScope,
    $controller,
    $httpBackend,
    $state,
    $stateParams,
    $scope,
    $api,
    controller,
    timeunit,
    timesheet,
    projects,
    spies;

  describe('Controllers', function() {

    beforeEach(
      module(
        'app.resources',
        'ngResource',
        'app.timesheets.timeunits',
        'app.timesheets.timeunits.controllers'
      ));

    // TODO : inject the $state and $stateParams services and assign them to the spec's variables
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $api = _$api_;
    }));

    beforeEach(inject(function ($injector) {
      // TODO : set user_id and _id on $stateParams

      projects = [{
        "_id": "creative_proj_id",
        "name": "Project1",
        "description": "This is your first project"
      }];

      timesheet = {"_id": "asdfghjklqwerty", beginDate: '2014-05-12'};
      timeunit = {
        "_id": "aaaaaaaaaa",
        "dateWorked": "2013-11-18",
        "hoursWorked": 8,
        "project": "Project1",
        "timesheet_id": timesheet._id,
        "project_id": projects[0]._id
        // TODO : set user_id to $stateParams.user_id for this test timeunit
      };

      spies = {
        // TODO : set up a sinon test stub on $state service
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('TimeunitCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        controller = $controller("TimeunitCtrl", {
          $scope: $scope,
          projects: projects
          // TODO : inject $stateParams into your test controller
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should set the resolved list of projects on scope

      });

      describe('cancel', function () {
        // TODO : verify it should return back to the timesheet detail
      });
    });

    describe('TimeunitEditCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        $scope  = $rootScope.$new();
        controller = $controller("TimeunitEditCtrl", {
          $scope: $scope,
          timeunit: new $api.timeunits(timeunit)

          // TODO : inject the spies.state and $stateParams into the test controller
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should attach the resolved timeunit onto scope

      });

      describe('Saving an edited timeunit', function () {
        var updatedTimeunit;

        beforeEach(function () {
          updatedTimeunit = angular.extend(timeunit, {hoursWorked: 12});
          $httpBackend.expect('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('PUT', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits/aaaaaaaaaa').respond(200, updatedTimeunit);
          });

          // TODO : verify it should set the timeunit on scope to be the updated timeunit

        });

      });
    });

    describe('TimeunitCreateCtrl', function() {

      beforeEach(inject(function($rootScope, $controller) {
        $scope  = $rootScope.$new();
        $scope.timesheet = {"_id": "asdfghjklqwerty", beginDate: '2014-05-12'};
        controller = $controller("TimeunitCreateCtrl", {
          $scope: $scope

          // TODO : inject $stateParams into the test controller
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });

        // TODO : verify it should initialize a new timeunit with user and timesheet ids

      });

      describe('Saving a new timeunit', function () {
        var updatedTimeunit;

        beforeEach(function () {
          updatedTimeunit = angular.extend(timeunit, {hoursWorked: 12});
          $httpBackend.expect('POST', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits');
        });

        describe('with success', function () {

          beforeEach(function () {
            $httpBackend.when('POST', '/users/1234567890/timesheets/asdfghjklqwerty/timeunits').respond(200, updatedTimeunit);
          });

          // TODO : verify it should set the timeunit on scope to be the new timeunit

        });

      });
    });

  });
});
