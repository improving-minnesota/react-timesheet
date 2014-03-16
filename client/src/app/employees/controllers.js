angular.module('app.employees.controllers', [])
  
  .controller('EmployeeCtrl', 
    // TODO : inject $state and $stateParams
    function ($control, $scope) {

      $scope.requestEmployees = function requestEmployees (page) {

        $control.list('employees')
          .then(function (employees) {
            $scope.employees = employees;
          });
      };

      // TODO : implement a function on scope to show the detail of an employee
      // TODO : implement a function on scope to navigate to the create employee state
      // TODO : implement a function on scope to handle cancel for child states

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
  )

  .controller('EmployeeDetailCtrl', 
    // TODO : inject $state and $stateParams
    function ($scope, employee) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state

      $scope.employee = employee;

      // TODO : implement a function on scope to update the employee
    }
  )

  .controller('EmployeeCreateCtrl', 
    // TODO : inject $state and $stateParams
    function ($scope, $control) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state

      $scope.employee = {admin: false};

      // TODO : implement a function on scope to update the employee and redirect to the detail state
    }
  );