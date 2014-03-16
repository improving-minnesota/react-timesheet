angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
    // TODO : inject $state and $stateParams services
    function ($control, $scope) {

      $scope.requestTimesheets = function requestTimesheets (page) {

        // TODO : assign the query's user_id to $stateParams.user_id
        var query = {};

        $control.list('timesheets', query)
          .then(function (timesheets) {
            $scope.timesheets = timesheets;
          });
      };

      // TODO : implement a function on scope to show the timesheet details
      // TODO : implement a function on scope to navigate to the create timesheet state

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
    // TODO : inject $state and $stateParams services
    function ($scope, $control, timesheet, timeunits) {
      $scope.timesheet = timesheet;
      $scope.timeunits = timeunits;

      // TODO : implement a function on scope to navigate to the edit timesheet state
      // TODO : implement a function on scope to handle cancels
      // TODO : implement a function on scope to navigate to the log time state
      // TODO : implement a function on scope to navigate to a timeunit's detail state

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
    // TODO : inject $state and $stateParams services
    function ($scope, $control, timesheet) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state

      $scope.timesheet = timesheet;

      // TODO : implement a function on scope to update the timesheet
      // TODO : implement a function on scope to return back to the detail state on cancel and reload
    }
  )

  .controller('TimesheetCreateCtrl', 
    // TODO : inject $state and $stateParams services
    function ($scope, $control) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state
      $scope.timesheet = {};

      // TODO : implement a function on scope to update the timesheet and redirect to the detail state
      // TODO : implement a function on scope to navigate to the timesheet list page on cancel and reload the scope
    }
  );
    