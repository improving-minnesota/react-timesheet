var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Cancel Button: ', function () {

  var CancelButton;

  beforeEach(function () {
    CancelButton = require('./cancel.button');
  });

  it('should instantiate the CancelButton', function () {
    expect(CancelButton).to.be.defined;
  });
});
