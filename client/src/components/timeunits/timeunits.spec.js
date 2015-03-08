var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Timeunits Component:', function () {

  var Timeunits;

  beforeEach(function () {
    Timeunits = require('./timeunits');
  });

  it('should instantiate the Timeunits', function () {
    expect(Timeunits).to.be.defined;
  });
});
