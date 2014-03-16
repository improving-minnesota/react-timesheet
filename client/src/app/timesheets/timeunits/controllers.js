angular.module('app.timesheets.timeunits.controllers', [])

  .controller('TimeunitCtrl', 
    function ($scope, $state, $stateParams, projects) {
      $scope.projects = projects; 

      $scope.cancel = function cancel () {
        $state.go('app.timesheets.detail', $stateParams, {reload: true});
      };
    }
  )

  .controller('TimeunitEditCtrl', 
    function ($scope, $state, $stateParams, notifications, timeunit) {
      $scope.timeunit = timeunit;
      
      $scope.save = function save () {
        $scope.timeunit.$update()
          .then(function (updated) {
            $scope.timeunit = updated;
            notifications.success('Timeunit updated.');
          })
          .catch(function (x) {
            notifications.error('Error updating timeunit.');
            $state.reload();
          });
      };
    }
  )

  .controller('TimeunitCreateCtrl', 
    function ($scope, $state, $stateParams, $control, notifications, dateFilter) {
      $scope.timeunit = {
        user_id: $stateParams.user_id,
        timesheet_id: $stateParams._id,
        dateWorked: $scope.timesheet.beginDate
      };

      $scope.save = function save () {

        $control.create('timeunits', $scope.timeunit)
          .then(function (created) {
            $state.go('app.timesheets.detail', $stateParams, {reload: true});
            notifications.success("Logged Time for " + dateFilter(created.dateWorked));
          })
          .catch(function (x) {
            notifications.error("There was an error logging time.");
          });
      };

    }
  );
    