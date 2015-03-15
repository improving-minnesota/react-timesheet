describe('Timeunit Mixin: ', function () {

  var TimeunitMixin;

  beforeEach(function () {
    TimeunitMixin = require('./timeunit.mixin');
  });

  it('should instantiate the TimeunitMixin', function () {
    expect(TimeunitMixin).to.be.defined;
  });
});
