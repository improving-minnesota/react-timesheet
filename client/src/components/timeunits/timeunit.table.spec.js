var proxyquire = require('proxyquireify')(require);
var _ = require('lodash');
var mockComponent = require('../mock');

describe('Timeunit Table Component: ', function () {

  var TimeunitTable,
    timeunits,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    spies = {

    };

    proxies = {
      './timeunit.row': mockComponent()
    };

    timeunits = [{}, {}];

    TimeunitTable = proxyquire('./timeunit.table', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitTable timeunits={timeunits} />);
  });

  it('should instantiate the TimeunitTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
