var proxyquire = require('proxyquireify')(require);
var _ = require('lodash');

describe('Flux Store: ', function () {

  var FluxStore;

  beforeEach(function () {
    FluxStore = require('./flux.store');
  });

  it('should instantiate the FluxStore', function () {
    expect(FluxStore).to.be.defined;
  });
});
