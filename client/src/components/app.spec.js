var React = require('react/addons'),
  _ = require('lodash'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require);

describe('App: ', function () {

  var App,
    LoginStore,
    element,
    spies = {},
    proxies;

  beforeEach(function () {
    proxies = {
      './common/navigation/navbar': React.createClass({
        render: function () {return (<div/>);}
      }),
      './common/section': React.createClass({
        render: function () {return (<div/>);}
      })
    };
    proxyquire('./app', proxies);

    App = require('./app');

    element =  TestUtils.renderIntoDocument(<App />);
  });

  it('should instantiate the App', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('during the will transition to lifecyle', function () {
    beforeEach(function () {
      LoginStore = require('../stores/snackbar.store');
      spies.requireAuthenticatedUser = sinon.stub(LoginStore, 'requireAuthenticatedUser').returns({name: 'Sterling'});

      App.statics.willTransitionTo('transitionArg', 'paramsArg');
    });

    afterEach(function () {
      spies.requireAuthenticatedUser.restore();
    });

    it('should require an authenticated user from the login store', function () {
      expect(spies.requireAuthenticatedUser).to.have.been.calledWith('transitionArg');
    });
  });
});
