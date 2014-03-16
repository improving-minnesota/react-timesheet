angular.module('app.timesheets.timeunits.controllers', [])

  .controller('TimeunitCtrl', 
    // TODO : inject the $state and $stateParams services
    function ($scope, projects) {
      $scope.projects = projects; 

      // TODO : implement a function on scope to handle cancels in child states
    }
  )

  .controller('TimeunitEditCtrl', 
    // TODO : inject the $state and $stateParams services
    function ($scope, timeunit) {
      $scope.timeunit = timeunit;
      
      // TODO : implement a function on scope to update the project
    }
  )

  .controller('TimeunitCreateCtrl', 
    // TODO : inject the $state and $stateParams services
    function ($scope, $control) {
      
      // TODO : initialize the new timeunit with data from $stateParams
      // 1. user_id = $stateParams.user_id
      // 2. timesheet_id = $stateParams._id
      $scope.timeunit = {
        dateWorked: $scope.timesheet.beginDate
      };

      // TODO : implement a function on scope to update the project and redirect to the detail state

    }
  );
    