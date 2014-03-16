angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
    function ($control, $scope) {

      $scope.requestTimesheets = function requestTimesheets (page) {
        var query = {
          user_id: 'all'
        };

        $control.list('timesheets', query)
          .then(function (timesheets) {
            $scope.timesheets = timesheets;
          });
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
  );
    