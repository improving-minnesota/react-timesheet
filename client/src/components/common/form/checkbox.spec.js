var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Checkbox component :', function () {

  var Checkbox;

  beforeEach(function () {
    Checkbox = require('./checkbox');
  });

  it('should instantiate the Checkbox', function () {
    expect(Checkbox).to.be.defined;
  });
});
