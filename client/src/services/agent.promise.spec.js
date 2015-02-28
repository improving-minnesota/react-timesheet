var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Wrapping Superagent: ', function () {
  var expect = chai.expect;

  var superagent;

  beforeEach(function () {
    superagent = require('./agent.promise');
  });

  it('should wrap superagent', function () {
    expect(superagent).to.be.defined;
  });
});
