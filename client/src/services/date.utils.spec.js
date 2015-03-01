var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Date Utils: ', function () {

  var DateUtils;

  beforeEach(function () {
    DateUtils = require('./date.utils');
  });

  it('should instantiate the DateUtils', function () {
    expect(DateUtils).to.be.defined;
  });
});
