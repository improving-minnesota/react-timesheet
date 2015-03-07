var React = require('react/addons'),
  _ = require('lodash'),
  TestUtils = React.addons.TestUtils;

describe('Cancel Button: ', function () {

  var CancelButton,
    element,
    testCtrl,
    spies = {};

  beforeEach(function () {
    CancelButton = require('./cancel.button');
    testCtrl = { onCancel: _.noop };
    spies.cancel = sinon.spy(testCtrl, 'onCancel');

    element = TestUtils.renderIntoDocument(
      <CancelButton onCancel={testCtrl.onCancel} />
    );
  });

  afterEach(function () {
    spies.cancel.restore();
  });

  it('should instantiate the CancelButton', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the button', function () {
    it('should call the callback', function () {
      var button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.cancel).to.have.been.called;
    });
  });
});
