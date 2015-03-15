var proxyquire = require('proxyquireify')(require);
var _ = require('lodash');

describe('Flux Dispatcher: ', function () {

  var dispatcher,
    spies,
    proxies;

  beforeEach(function () {

    proxies = {
      'flux': {
        Dispatcher: function () {
          this.dispatch = _.noop;
        }
      }
    };
    proxyquire('./flux.dispatcher', proxies);

    dispatcher = require('./flux.dispatcher');

    spies = {
      dispatch: sinon.spy(dispatcher, 'dispatch')
    };
  });

  afterEach(function () {
    spies.dispatch.restore();
  });

  it('should instantiate the dispatcher', function () {
    expect(dispatcher).to.be.defined;
  });

});
