var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Number Input : ', function () {

  var NumberInput;

  beforeEach(function () {
    NumberInput = require('./number.input');
  });

  it('should instantiate the NumberInput', function () {
    expect(NumberInput).to.be.defined;
  });
});
