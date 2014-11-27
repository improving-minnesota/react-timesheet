/** @jsx React.DOM */

var React = require('React');

var LoginForm = React.createClass({

  render: function () {
    return (
      <div className="tsz-login-form row" vertical-center-element=".tsz-view-container">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div className="well well-lg">

                <div className="row hidden-xs">
                  <div className="col-xs-6">
                    <p className="tsz-login-header">Welcome to Timesheetz</p>
                    <hr/>
                  </div>
                  <div className="col-xs-6">
                    <div className="tsz-login-header pull-right">Please Login</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="alert alert-warning" ng-show="authReason">
                      {this.props.authReason}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="alert alert-danger" ng-show="authError">
                      {this.props.authError}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <form novalidate className="form-horizontal" name="loginForm">
                      <div className="form-group">
                        <label className="col-sm-2 control-label" for="login">Username</label>
                        <div className="col-sm-10">
                          <input className="form-control" name="login" type="text" value={this.state.user.username} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label" for="pass">Password</label>
                        <div className="col-sm-10">
                          <input className="form-control" name="pass" type="password" value={this.state.user.password} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-xs-12 col-sm-3 col-sm-offset-9">
                          <button className="btn btn-primary login btn-block" onClick={this.login} ng-disabled="loginForm.$invalid">Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginForm;
//
// $stateProvider
//   // -------------  Login ----------------
//   .state('login', {
//     url: '/login?redirect',
//     data: {
//       section: 'Please Log In'
//     },
//     views : {
//       'login' : {
//         templateUrl: 'assets/templates/security/login.html',
//         controller: 'LoginCtrl'
//       }
//     }
//   });
//
// angular.module('app.security.controllers', [
//   'authentication.services',
//   'authorization.services',
//   'security.services'
// ])
//
// // The LoginCtrl provides the behaviour behind a reusable form to allow users to authenticate.
// .controller('LoginCtrl',
//   function ($scope, $location, $stateParams, authentication, authorization, securityContext) {
//
//     // Request the current user, this will wait until the current user
//     // promise is resolved.
//     authorization.requireAuthenticatedUser()
//       .then(function () {
//         // Once the user logs in, redirect to the state the user originally
//         // attempted to navigate to (passed in as a redirect parameter)
//         if ($stateParams.redirect) {
//           $location.path(decodeURIComponent($stateParams.redirect));
//         // If not redirect, change the state to main
//         } else {
//           $location.path('/');
//         }
//       });
//
//     // The model for this form
//     $scope.user = {};
//
//     // Any error message from failing to login
//     $scope.authError = null;
//
//     // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
//     // We could do something diffent for each reason here but to keep it simple...
//     $scope.authReason = null;
//     if ( authentication.getLoginReason() ) {
//       $scope.authReason = ( securityContext.authenticated ) ?
//         "You are not authorized to perform this action." : "";
//     }
//
//     // Attempt to authenticate the user specified in the form's model
//     $scope.login = function () {
//
//       // Clear any previous security errors
//       $scope.authError = null;
//
//       // Try to login
//       authentication.login($scope.user.username, $scope.user.password)
//         .then(function () {
//           if ( !securityContext.authenticated ) {
//             // If we get here then the login failed due to bad credentials
//             $scope.authError = "Invalid username and password combination.";
//           }
//         })
//         .catch(function (x) {
//           // If we get here then there was a problem with the login request to the server
//           $scope.authError = "Invalid username and password combination.";
//         });
//     };
//
//     $scope.clearForm = function () {
//       $scope.user = {};
//     };
//   }
// );
