angular.module('app.security.controllers', [
  'authentication.services',
  'authorization.services',
  'security.services'
])

// The LoginCtrl provides the behaviour behind a reusable form to allow users to authenticate.
.controller('LoginCtrl', 
  function ($scope, $location, $stateParams, authentication, authorization, securityContext) {

    // Request the current user, this will wait until the current user
    // promise is resolved.
    authorization.requireAuthenticatedUser()
      .then(function () {
        // Once the user logs in, redirect to the state the user originally 
        // attempted to navigate to (passed in as a redirect parameter)
        if ($stateParams.redirect) {
          $location.path(decodeURIComponent($stateParams.redirect));
        // If not redirect, change the state to main
        } else {
          $location.path('/');
        }
      });

    // The model for this form 
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;

    // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
    // We could do something diffent for each reason here but to keep it simple...
    $scope.authReason = null;
    if ( authentication.getLoginReason() ) {
      $scope.authReason = ( securityContext.authenticated ) ?
        "You are not authorized to perform this action." : "";
    }

    // Attempt to authenticate the user specified in the form's model
    $scope.login = function () {

      // Clear any previous security errors
      $scope.authError = null;

      // Try to login
      authentication.login($scope.user.username, $scope.user.password)
        .then(function () {
          if ( !securityContext.authenticated ) {
            // If we get here then the login failed due to bad credentials
            $scope.authError = "Invalid username and password combination.";
          }
        })
        .catch(function (x) {
          // If we get here then there was a problem with the login request to the server
          $scope.authError = "Invalid username and password combination.";
        });
    };

    $scope.clearForm = function () {
      $scope.user = {};
    };
  }
);
