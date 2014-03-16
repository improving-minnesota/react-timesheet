angular.module('app.controllers', [])

  .controller('MainCtrl', function ($scope, securityContext){
    
    $scope.$watch(function () {
      return securityContext.authenticated;
    },
    function (authenticated) {
      $scope.authenticated = authenticated;
      $scope.loggedInUser = securityContext.user;
    });

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