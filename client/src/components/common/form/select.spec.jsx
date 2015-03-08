var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Select Component:', function () {

  var Select;

  beforeEach(function () {
    Select = require('./select');
  });

  it('should instantiate the select box', function () {
    expect(Select).to.be.defined;
  });
});
