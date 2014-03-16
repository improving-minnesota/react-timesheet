angular.module('app.controllers', [])

  .controller('MainCtrl', function ($scope, securityContext){
    
    // TODO : Watch securityContext for changes and update 
    // authenticated and loggedInUser on scope

  })
  
  .controller('AppCtrl', 
    function ($scope){
      
    }
  )

  .controller('NavCtrl', 
    function ($scope, authentication) {
    
      $scope.logout = function logout () {
        authentication.logout();
      };
    }
  );