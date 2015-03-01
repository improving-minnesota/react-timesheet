var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timeunit Form Component: ', function () {

  var TimeunitForm;

  beforeEach(function () {
    TimeunitForm = require('./timeunit.form');
  });

  it('should instantiate the TimeunitForm', function () {
    expect(TimeunitForm).to.be.defined;
  });
});
