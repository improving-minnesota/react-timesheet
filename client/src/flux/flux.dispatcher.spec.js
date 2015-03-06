var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  fluxDispatcher = require('flux').Dispatcher;

describe('Flux Dispatcher: ', function () {

  var dispatcher,
    parent;

  beforeEach(function () {
    parent = sinon.stub(fluxDispatcher);
    dispatcher = require('./flux.dispatcher');
  });

  it('should instantiate the dispatcher', function () {
    expect(dispatcher).to.be.defined;
  });

  describe('handling a view action', function () {

  });
});
