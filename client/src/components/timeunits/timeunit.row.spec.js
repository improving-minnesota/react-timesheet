var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timeunit Row Component: ', function () {

  var TimeunitRow;

  beforeEach(function () {
    TimeunitRow = require('./timeunit.row');
  });

  it('should instantiate the TimeunitRow', function () {
    expect(TimeunitRow).to.be.defined;
  });
});
