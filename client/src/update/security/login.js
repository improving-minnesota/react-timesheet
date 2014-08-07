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
                       <!-- Add the authentication reason here  -->
                      {{authReason}}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="alert alert-danger" ng-show="authError">
                      {{authError}}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <form novalidate className="form-horizontal" name="loginForm">
                      <div className="form-group">     
                        <label className="col-sm-2 control-label" for="login">Username</label>
                        <div className="col-sm-10">
                          <input className="form-control" name="login" type="text" ng-model="user.username" required autofocus>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label" for="pass">Password</label>
                        <div className="col-sm-10">
                          <input className="form-control" name="pass" type="password" ng-model="user.password" required>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-xs-12 col-sm-3 col-sm-offset-9">
                          <button className="btn btn-primary login btn-block" ng-click="login()" ng-disabled="loginForm.$invalid">Login</button>
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