var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Flux Dispatcher: ', function () {

  var FluxDispatcher;

  beforeEach(function () {
    FluxDispatcher = require('./flux.dispatcher');
  });

  it('should instantiate the FluxDispatcher', function () {
    expect(FluxDispatcher).to.be.defined;
  });
});
