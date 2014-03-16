angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
    // TODO : inject the notifications service
    function ($control, $scope, $state, $stateParams) {

      $scope.requestTimesheets = function requestTimesheets (page) {

        var query = {
          user_id: $stateParams.user_id
        };

        $control.list('timesheets', query)
          .then(function (timesheets) {
            $scope.timesheets = timesheets;
          });
      };

      $scope.showDetail = function showDetail (timesheet) {
        if (timesheet.deleted) {
            // TODO : send an error notification using the notifications service
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
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {  
            timesheet.deleted = false;
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.restore = function restore (timesheet) {
        
        $control.restore('timesheets', timesheet)
          .then(function (restored) {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            timesheet.deleted = true;
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.requestTimesheets(1);
    }
  )

  .controller('TimesheetDetailCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, $control, timesheet, timeunits) {
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
            // TODO : send an error notification using the notifications service
          return;
        }

        $stateParams.timeunit_id = timeunit._id;
        $state.go('app.timesheets.detail.timeunits.edit', $stateParams);
      };

      $scope.removeTimeunit = function removeTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.remove('timeunits', timeunit) 
          .then(function () {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            timeunit.deleted = false;
            // TODO : send an error notification using the notifications service
          });

          console.log("remove");
      };

      $scope.restoreTimeunit = function restoreTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.restore('timeunits', timeunit)
          .then(function (restored) {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            timeunit.deleted = true;
            // TODO : send an error notification using the notifications service
          });
      };
    } 
  )

  .controller('TimesheetEditCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, $control, timesheet) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = timesheet;

      $scope.save = function save () {
        $scope.timesheet.$update()
          .then(function (updated) {
            $scope.timesheet = updated;
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets.detail', $stateParams, {reload: true});
      };
    }
  )

  .controller('TimesheetCreateCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, $control) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = {};

      $scope.save = function save () {
        var timesheet = angular.extend({user_id: $stateParams.user_id}, $scope.timesheet);

        $control.create('timesheets', timesheet)
          .then(function (created) {
            $state.go('app.timesheets.detail', {user_id: $stateParams.user_id, _id: created._id});
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            // TODO : send an error notification using the notifications service
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets', $stateParams, {reload: true});
      };
    }
  );
    