angular.module('app.employees.controllers', [])
  
  .controller('EmployeeCtrl', 
    function ($control, $scope) {

      $scope.requestEmployees = function requestEmployees (page) {

        $control.list('employees')
          .then(function (employees) {
            $scope.employees = employees;
          });
      };

      $scope.remove = function remove (employee) {

        $control.remove('employees', employee) 
          .then(function () {
            console.log('success!');
          })
          .catch(function (x) {
            employee.deleted = false;
            console.log('error : ' + x);
          });
      };

      $scope.restore = function restore (employee) {
       
       $control.restore('employees', employee)
          .then(function (restored) {
            console.log('success!');
          })
          .catch(function (x) {
            employee.deleted = true;
            console.log('error : ' + x);
          });
      };

      $scope.requestEmployees(1);
    }
  );