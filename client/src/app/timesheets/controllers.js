angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
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
          console.log('error : cannot view a deleted timesheet');
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
            console.log('success !');
          })
          .catch(function (x) {  
            timesheet.deleted = false;
            console.log('error ' + x);
          });
      };

      $scope.restore = function restore (timesheet) {
        
        $control.restore('timesheets', timesheet)
          .then(function (restored) {
            console.log('success !');
          })
          .catch(function (x) {
            timesheet.deleted = true;
            console.log('error ' + x);
          });
      };

      $scope.requestTimesheets(1);
    }
  )

  .controller('TimesheetDetailCtrl', 
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
            console.log('error ' + x);
          return;
        }

        $stateParams.timeunit_id = timeunit._id;
        $state.go('app.timesheets.detail.timeunits.edit', $stateParams);
      };

      $scope.removeTimeunit = function removeTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.remove('timeunits', timeunit) 
          .then(function () {
            console.log('success !');
          })
          .catch(function (x) {
            timeunit.deleted = false;
            console.log('error ' + x);
          });

          console.log("remove");
      };

      $scope.restoreTimeunit = function restoreTimeunit (timeunit) {
        timeunit.user_id = timesheet.user_id;

        $control.restore('timeunits', timeunit)
          .then(function (restored) {
            console.log('success !');
          })
          .catch(function (x) {
            timeunit.deleted = true;
            console.log('error ' + x);
          });
      };
    } 
  )

  .controller('TimesheetEditCtrl', 
    function ($scope, $state, $stateParams, $control, timesheet) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = timesheet;

      $scope.save = function save () {
        $scope.timesheet.$update()
          .then(function (updated) {
            $scope.timesheet = updated;
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error ' + x);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets.detail', $stateParams, {reload: true});
      };
    }
  )

  .controller('TimesheetCreateCtrl', 
    function ($scope, $state, $stateParams, $control) {
      $scope.saveText = $state.current.data.saveText;
      $scope.timesheet = {};

      $scope.save = function save () {
        var timesheet = angular.extend({user_id: $stateParams.user_id}, $scope.timesheet);

        $control.create('timesheets', timesheet)
          .then(function (created) {
            $state.go('app.timesheets.detail', {user_id: $stateParams.user_id, _id: created._id});
            console.log('success !');
          })
          .catch(function (x) {
            console.log('error ' + x);
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.timesheets', $stateParams, {reload: true});
      };
    }
  );
    