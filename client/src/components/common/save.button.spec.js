var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Save Button: ', function () {

  var SaveButton;

  beforeEach(function () {
    SaveButton = require('./save.button');
  });

  it('should instantiate the SaveButton', function () {
    expect(SaveButton).to.be.defined;
  });
});
