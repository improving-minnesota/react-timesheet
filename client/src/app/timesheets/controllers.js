angular.module('app.timesheets.controllers', [
  'timesheet.directives'
])

  .controller('TimesheetCtrl', 
    function ($control, $scope, $state, $stateParams, notifications) {

      $scope.requestTimesheets = function requestTimesheets (page) {

        var query = {
          user_id: $stateParams.user_id,
          page: page,
          sort: {beginDate: 1}
        };

        $control.page('timesheets', query)
          .then(function (pageConfig) {
            $scope.pageConfig = pageConfig;
          });
      };

      $scope.showDetail = function showDetail (timesheet) {
        if (timesheet.deleted) {
          notifications.error('You cannot edit a deleted timesheet.');
          return;
        }
        $state.go('app.timesheets.detail', timesheet);
      };

      $scope.createNew = function createNew () {
        $state.go('app.timesheets.create', $stateParams);
      };

      $scope.remove = function remove (timesheet) {

        $control.remove('timesheets', timesheet)
          .then(function () {
            notifications.success('Timesheet deleted.');
          })
          .catch(function (x) {  
            timesheet.deleted = false;
            notifications.error('Error deleting timesheet : ' + x); 
          });
      };

      $scope.restore = function restore (timesheet) {
        
        $control.restore('timesheets', timesheet)
          .then(function (restored) {
            notifications.success('Timesheet restored.');
          })
          .catch(function (x) {
            timesheet.deleted = true;
            notifications.error('Error restoring timesheet: ' + x);
          });
      };

      $scope.requestTimesheets(1);
    }
  )

  .controller('TimesheetDetailCtrl', 
    function ($scope, $state, $stateParams, $control, notifications, timesheet, timeunits) {
      $scope.timesheet = timesheet;
      $scope.timeunits = timeunits;

      $scope.edit = function edit (timesheet) {
        $state.go('app.timesheets.detail.edit', $stateParams);
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets', $stateParams, {reload: true});
      };

      $scope.logTime = function logTime () {
        $state.go('app.timesheets.detail.timeunits.create', $stateParams);
      };

      $scope.showTimeunitDetail = function showTimeunitDetail (timeunit) {
        if (timeunit.deleted) {
          notifications.error('Cannot edit a deleted timeunit.');
          return;
        }

        $stateParams.timeunit_id = timeunit._id;
        $state.go('app.timesheets.detail.timeunits.edit', $stateParams);
      };

      $scope.removeTimeunit = function removeTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.remove('timeunits', timeunit) 
          .then(function () {
            notifications.success('Timeunit deleted.');
          })
          .catch(function (x) {
            timeunit.deleted = false;
            notifications.error('Error deleting timeunit. Timeunit restore.');
          });

          console.log("remove");
      };

      $scope.restoreTimeunit = function restoreTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.restore('timeunits', timeunit)
          .then(function (restored) {
            notifications.success('Timeunit was restored.');
          })
          .catch(function (x) {
            timeunit.deleted = true;
            notifications.error('Error restoring the timeunit.');
          });
      };

      $scope.hoursRequired = function hoursRequired() {
        var daysInTimesheet = moment($scope.timesheet.endDate).diff(moment($scope.timesheet.beginDate), 'days') + 1,
          weekDays = 0;
        for (var i = 0; i < daysInTimesheet; i++) {
          switch(moment($scope.timesheet.beginDate).add('days', i).isoWeekday()) {
            case 1: case 2: case 3: case 4: case 5: 
              weekDays++;
          }
        }
        return weekDays * 8;
      };

      $scope.hoursWorked = function hoursWorked() {
        return _.reduce(_.map($scope.timeunits, function (timeunit) {
          return timeunit.deleted ? 0 : timeunit.hoursWorked;
        }), function(sum, hoursWorked) {
          return sum + hoursWorked;
        });
      };

      $scope.reportStatus = function reportStatus(percentComplete) {
        notifications.info('You have worked ' + percentComplete + ' of your required hours');
      };
    } 
  )

  .controller('TimesheetEditCtrl', 
    function ($scope, $state, $stateParams, $control, notifications, timesheet) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = timesheet;

      $scope.save = function save () {
        $scope.timesheet.$update()
          .then(function (updated) {
            $scope.timesheet = updated;
            notifications.success("Timesheet: " + $scope.timesheet.name + ", was successfully updated.");
          })
          .catch(function (x) {
            notifications.error('There was an error updating timesheet : ' + $scope.timesheet.name);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets.detail', $stateParams, {reload: true});
      };
    }
  )

  .controller('TimesheetCreateCtrl', 
    function ($scope, $state, $stateParams, $control, notifications) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = {};

      $scope.save = function save () {
        var timesheet = angular.extend({user_id: $stateParams.user_id}, $scope.timesheet);

        $control.create('timesheets', timesheet)
          .then(function (created) {
            $state.go('app.timesheets.detail', {user_id: $stateParams.user_id, _id: created._id});
            notifications.success("Timesheet: " + $scope.timesheet.name + ", was successfully created.");
          })
          .catch(function (x) {
            notifications.error('There was an error creating timesheet : ' + $scope.timesheet.name);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets', $stateParams, {reload: true});
      };
    }
  );
    