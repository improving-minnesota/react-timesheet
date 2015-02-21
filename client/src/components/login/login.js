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

  login: function (event) {
    event.preventDefault();
    LoginActions.login(this.state.credentials);
  },

  render: function () {
    return (
      <div className="ui padded page grid">
        <div className="two column centered row">
          <div className="left aligned column">
            <h4>Welcome to Timesheetz</h4>
          </div>
          <div className="right aligned column">
            <h5>Please Login</h5>
          </div>
        </div>

        <hr/>

        <AuthError authError={this.state.authError} />

        <div className="centered row">
          <div className="center aligned eight wide column">
            <form className="ui form" name="loginForm" onSubmit={this.login}>
              <div className="inline field">
                <label htmlFor="login">Username</label>
                <input type="text"
                  name="username" ref="login"
                  value={this.state.credentials.username}
                  onChange={this.validate} required />
              </div>
              <div className="inline field">
                <label htmlFor="pass">Password</label>
                <input type="password"
                  name="password" ref="password"
                  value={this.state.credentials.password}
                  onChange={this.validate} required />
              </div>
              <div className="ui right aligned column">
                <button className="ui primary login button">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginForm;
