var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timeunit Create Component: ', function () {

  var TimeunitCreate;

  beforeEach(function () {
    TimeunitCreate = require('./timeunit.create');
  });

  it('should instantiate the TimeunitCreate', function () {
    expect(TimeunitCreate).to.be.defined;
  });
});
