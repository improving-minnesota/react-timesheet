var _ = require('lodash');

describe('Snackbar Component: ', function () {

  var Snackbar,
    SnackbarActions,
    element,
    spies = {};

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    SnackbarActions = require('../../actions/snackbar.actions');
  });

  beforeEach(function () {
    Snackbar = require('./snackbar');
    element = TestUtils.renderIntoDocument(<Snackbar />);
  });

  it('should instantiate the Snackbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  // TODO - Test me!!

});
