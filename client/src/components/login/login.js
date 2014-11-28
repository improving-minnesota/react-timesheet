/** @jsx React.DOM */

var React = require('React');
var Router = require('react-router');

var LoginActions = require('../../actions/login.actions');
var LoginStore = require('../../stores/login.store');
var ChangeMixin = require('../../mixins/change.mixin');

var AuthError = require('./auth.error');

var LoginForm = React.createClass({

  mixins: [
    ChangeMixin
  ],

  store: LoginStore,

  getInitialState: function () {
    return this.store.getState();
  },

  validate: function (event) {
    this.state.credentials[event.target.name] = event.target.value;
    this.setState(this.state.credentials);
  },

  login: function () {
    LoginActions.login(this.state.credentials);
  },

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

                <AuthError authError={this.state.authError} />

                <div className="row">
                  <div className="col-xs-12">
                    <form novalidate className="form-horizontal" name="loginForm">
                      <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="login">Username</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control"
                            name="username" ref="login"
                            value={this.state.credentials.username}
                            onChange={this.validate} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="pass">Password</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control"
                            name="password" ref="password"
                            value={this.state.credentials.password}
                            onChange={this.validate} required />
                        </div>
                      </div>
                    </form>
                    <div className="form-group">
                      <div className="col-xs-12 col-sm-3 col-sm-offset-9">
                        <button className="btn btn-primary login btn-block"
                          onClick={this.login}>Login</button>
                      </div>
                    </div>
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

//     // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
//     // We could do something diffent for each reason here but to keep it simple...
//     $scope.authReason = null;
//     if ( authentication.getLoginReason() ) {
//       $scope.authReason = ( securityContext.authenticated ) ?
//         "You are not authorized to perform this action." : "";
//     }
//
