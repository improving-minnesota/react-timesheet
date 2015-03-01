var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Validator: ', function () {

  var Validator;

  beforeEach(function () {
    Validator = require('./validator');
  });

  it('should instantiate the Validator', function () {
    expect(Validator).to.be.defined;
  });
});
