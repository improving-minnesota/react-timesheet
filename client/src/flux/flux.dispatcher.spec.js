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

  describe('handling a view action', function () {
    it('should dispatch the action with a source of VIEW_ACTION', function () {
      dispatcher.handleViewAction('testAction');
      expect(spies.dispatch).to.have.been.calledWith({source: 'VIEW_ACTION', action: 'testAction'});
    });
  });
});
