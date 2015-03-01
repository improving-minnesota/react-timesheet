var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Section Component: ', function () {
  var expect = chai.expect;

  var Section;

  beforeEach(function () {
    Section = require('./section');
  });

  it('should instantiate the Section', function () {
    expect(Section).to.be.defined;
  });
});
