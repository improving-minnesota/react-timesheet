angular.module('app.projects.controllers', [])
    
  .controller('ProjectCtrl', 
    // TODO : inject the $state and $stateProvider services
    function ($control, $scope) { 

      $scope.requestProjects = function requestProjects (page) {
        
        $control.list('projects')
          .then(function (projects) {
            $scope.projects = projects;
          });
      };

      // TODO : implement a function on scope to show a project details
      // TODO : implement a function on scope to navigate to the create project state
      // TODO : implement a function on scope to handle cancels in child states

      $scope.remove = function remove (project) {
        $control.remove('projects', project)
          .then(function (removed) {
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = false;
            console.log('error : ' + x);
          });
      };

      $scope.restore = function restore (project) { 

        $control.restore('projects', project) 
          .then(function (restored) {
            console.log('success !');
          })
          .catch(function (x) {
            project.deleted = true;
            console.log('error : ' + x);
          });
      };

      $scope.requestProjects(1);
    }
  )

  .controller('ProjectDetailCtrl', 
    // TODO : inject the $state and $stateProvider services
    function ($scope, project) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state

      $scope.project = project;

      // TODO : implement a function on scope to update the project
    }
  )

  .controller('ProjectCreateCtrl', 
    // TODO : inject the $state and $stateProvider services
    function ($scope, $control) {
      // TODO : set saveText on scope to the saveText assigned to the data of the current state

      $scope.project = {};

      // TODO : implement a function on scope to update the project and redirect to the detail state
    }
  );