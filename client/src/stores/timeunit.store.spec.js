describe('Timeunit Store: ', function () {

  var TimeunitStore;

  beforeEach(function () {
    TimeunitStore = require('./timeunit.store');
  });

  it('should instantiate the TimeunitStore', function () {
    expect(TimeunitStore).to.be.defined;
  });
});
