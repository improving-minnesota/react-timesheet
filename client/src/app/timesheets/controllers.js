angular.module('app.timesheets.controllers', [])

  .controller('TimesheetCtrl', 
    function (data, $scope) {

      $scope.requestTimesheets = function requestTimesheets (page) {
        var query = {
          user_id: 'all'
        };

        data.list('timesheets', query)
          .then(function (timesheets) {
            $scope.timesheets = timesheets;
          });
      };

      $scope.remove = function remove (timesheet) {

        data.remove('timesheets', timesheet)
          .then(function () {
            console.log('success !');
          })
          .catch(function (x) {  
            timesheet.deleted = false;
            console.log('error ' + x);
          });
      };

      $scope.restore = function restore (timesheet) {
        
        data.restore('timesheets', timesheet)
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
    