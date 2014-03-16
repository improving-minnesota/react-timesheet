angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
    function ($control, $scope) {

      // TODO : implement a function on scope to request timesheets
      $scope.requestTimesheets = function requestTimesheets () {
        // Since the server expects a user_id in the request url, we can send 'all'
        // for now which will return every timesheet. 
        var query = {
          user_id: 'all'
        };

      };

      // TODO : implement a function on scope to soft delete a timesheet
      // TODO : implement a function on scope to restore a deleted timesheet
      // TODO : initialize scope by calling requestTimesheets
      
    }
  );
    