var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  proxyquire = require('proxyquireify')(require),
  TimeunitActions = require('../../actions/timeunit.actions'),
  mock = require('../mock');

describe('Timeunits Component:', function () {

  var Timeunits,
    element,
    spies,
    proxies;

  beforeEach(function () {
    spies = {
      requestTimeunits: sinon.stub(TimeunitActions, 'list')
    };

   proxies = {
      './timunit.table': mock.mockComponent(),
      'react-router': {
        RouteHandler: mock.mockComponent(),
        Link: mock.mockComponent(),
        State: {
          getParams: function () {
            return {
              _id: '123456',
              user_id: 'user_id',
              timeunit_id: 'timeunit_id'
            }
          }
        }
      }
    };

    Timeunits = proxyquire('./timeunits', proxies);
    element = TestUtils.renderIntoDocument(<Timeunits timesheet={{_id: '12345'}}/>);
  });

  afterEach(function () {
    spies.requestTimeunits.restore();
  });

  it('should instantiate the Timeunits', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new timunit button', function () {
    it('should transition to the create timunit route', function () {
      
    });
  });
});
