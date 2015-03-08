var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Text Input: ', function () {

  var TextInput;

  beforeEach(function () {
    TextInput = require('./text.input');
  });

  it('should instantiate the TextInput', function () {
    expect(TextInput).to.be.defined;
  });
});
