var _ = require('lodash');

describe('Timeunit Table Component: ', function () {

  var TimeunitTable,
    TimeunitStore,
    timeunits,
    element,
    spies = {},
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    TimeunitStore = require('../../stores/timeunit.store');
  });

  beforeEach(function () {
    timeunits = [{}, {}];

    TimeunitTable = require('./timeunit.table');
    element = TestUtils.renderIntoDocument(
      <TimeunitTable timeunits={timeunits} store={TimeunitStore} />
    );
  });

  it('should instantiate the TimeunitTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
