var proxyquire = require('proxyquireify')(require);
var mockComponent = require('../mock');
var _ = require('lodash');

describe('Timeunits Component:', function () {

  var Timeunits,
    element,
    spies,
    proxies;

  var React, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {

   proxies = {
      './timunit.table': mockComponent(),
      'react-router': {
        RouteHandler: mockComponent(),
        Link: mockComponent(),
        State: {
          getParams: function () {
            return {
              _id: '123456',
              user_id: 'user_id',
              timeunit_id: 'timeunit_id'
            }
          }
        },
        '../../actions/timeuint.actions': {
          list: sinon.stub()
        }
      }
    };

    Timeunits = proxyquire('./timeunits', proxies);
    element = TestUtils.renderIntoDocument(<Timeunits timesheet={{_id: '12345'}}/>);
  });

  it('should instantiate the Timeunits', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new timunit button', function () {
    it('should transition to the create timunit route', function () {
      
    });
  });
});
