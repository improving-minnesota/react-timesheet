var React = require('react/addons'),
  _ = require('lodash'),
  TestUtils = React.addons.TestUtils;

describe('Save Button: ', function () {

  var SaveButton,
    element,
    button,
    testCtrl,
    spies = {};

  beforeEach(function () {
    SaveButton = require('./save.button');
    testCtrl = { onSave: _.noop };
    spies.save = sinon.spy(testCtrl, 'onSave');

    element = TestUtils.renderIntoDocument(
      <SaveButton saveText="phrasing" hasErrors="true"/>
    );

    button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
  });

  afterEach(function () {
    spies.save.restore();
  });

  it('should instantiate the SaveButton', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  it('should set the text on the button', function () {
    expect(button.getDOMNode().innerText).to.equal('phrasing');
  });

  describe('when the form has errors', function () {
    it('should disable the button', function () {
      expect(button.getDOMNode().disabled).to.be.true;
    });
  });
});
