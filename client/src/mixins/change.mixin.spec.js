describe('Change Mixin: ', function () {

  var ChangeMixin;

  beforeEach(function () {
    ChangeMixin = require('./change.mixin');
  });

  it('should instantiate the ChangeMixin', function () {
    expect(ChangeMixin).to.be.defined;
  });
});
