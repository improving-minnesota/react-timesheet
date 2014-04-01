angular.module('app.employees.controllers', [])
  
  .controller('EmployeeCtrl', 
    function (data, $scope, $state, $stateParams) { // TODO : inject the notifications service

      $scope.requestEmployees = function requestEmployees (page) {

        data.list('employees')
          .then(function (employees) {
            $scope.employees = employees;
          });
      };

      $scope.showDetail = function showDetail (employee) {
        if (employee.deleted) {
          // TODO : send a notification alerting the user they cannot view a deleted employee
          return;
        }
        $state.go('app.employees.detail', employee);
      };  

      $scope.createNew = function createNew () {
        $state.go('app.employees.create', $stateParams);
      };

      $scope.remove = function remove (employee) {

        data.remove('employees', employee) 
          .then(function () {
            // TODO : send a success notification using the notifications service
          })
          .catch(function (x) {
            employee.deleted = false;
            // TODO : send an error notification to the users
          });
      };

      $scope.restore = function restore (employee) {
       
       data.restore('employees', employee)
          .then(function (restored) {
            // TODO : send a success notification 
          })
          .catch(function (x) {
            employee.deleted = true;
            // TODO : send an error notification
          });
      };

      $scope.cancel = function cancel () {
        $state.go('app.employees', {}, {reload: true});
      };

      $scope.requestEmployees(1);
    }
  )

  .controller('EmployeeDetailCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, employee) {
      $scope.saveText = $state.current.data.saveText;
      $scope.employee = employee;

      $scope.save = function save () {
        $scope.employee.$update()
          .then(function (updated) {
            $scope.timesheet = updated;
            // TODO : send a success notification
          })
          .catch(function (x) {
            // TODO : send an error notification
          });
      };
    }
  )

  .controller('EmployeeCreateCtrl', 
    // TODO : inject the notifications service
    function ($scope, $state, $stateParams, data) {
      $scope.saveText = $state.current.data.saveText;
      $scope.employee = {admin: false};

      $scope.save = function save () {
        data.create('employees', $scope.employee)
          .then(function (created) {
            // TODO : send a success notification
            $state.go('app.employees.detail', {_id: created._id});
          })
          .catch(function (x) {
            // TODO : send an error notification
          });
      };
    }
  );