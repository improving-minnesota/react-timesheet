var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Navbar Component: ', function () {

  var Navbar;

  beforeEach(function () {
    Navbar = require('./navbar');
  });

  it('should instantiate the Navbar', function () {
    expect(Navbar).to.be.defined;
  });
});
