jest.dontMock('./timeunit.actions');

describe('Timeunit actions: ', function () {

  var TimeunitActions;

  beforeEach(function () {
    TimeunitActions = require('./timeunit.actions');
  });

  it('should instantiate the TimeunitActions', function () {
    expect(TimeunitActions).toBeDefined();
  });
});
