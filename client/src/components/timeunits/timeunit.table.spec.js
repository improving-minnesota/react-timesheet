var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  mock = require('../mock');

describe('Timeunit Table Component: ', function () {

  var TimeunitTable,
    timeunits,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './timeunit.row': mock.mockComponent()
    };

    timeunits = [{}, {}];

    TimeunitTable = proxyquire('./timeunit.table', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitTable timeunits={timeunits} />);
  });

  it('should instantiate the TimeunitTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
