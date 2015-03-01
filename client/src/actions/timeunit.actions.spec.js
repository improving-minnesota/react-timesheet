var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timeunit actions: ', function () {
  var TimeunitActions;

  beforeEach(function () {
    TimeunitActions = require('./timeunit.actions');
  });

  it('should instantiate the TimeunitActions', function () {
    expect(TimeunitActions).to.be.defined;
  });
});
