var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Flux Store: ', function () {

  var FluxStore;

  beforeEach(function () {
    FluxStore = require('./flux.store');
  });

  it('should instantiate the FluxStore', function () {
    expect(FluxStore).to.be.defined;
  });
});
