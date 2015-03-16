** Creating Your Own Custom Components **


components/snackbar.jsx
```javascript
var classes = require('react-classes');

var SnackbarStore = require('../../stores/snackbar.store');
var SnackbarActions = require('../../actions/snackbar.actions');
```

components/snackbar.jsx
```javascript
  store: SnackbarStore,

  mixins: [classes],

  getInitialState: function () {
    return {
      message: '',
      messageType: ''
    };
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.notify);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.notify);
  },

  notify: function () {
    this.setState(this.store.getState());
  },

  hide: function () {
    SnackbarActions.hide();
  },

  render: function () {

    var classes = this.getClass('ui inline snackbar top right', {
      'hide':     !this.state.message.length,
      'success':  this.state.messageType === 'success',
      'info':     this.state.messageType === 'info',
      'error':    this.state.messageType === 'error'
    });

    return (
      <div className={classes}>
        <span className="title">{this.state.message}</span>
        <i className="fa fa-close" onClick={this.hide} />
      </div>
    )
  }
```

components/snackbar.spec.js
```javascript
  describe('when there is no message', function () {

    beforeEach(function () {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    it('should hide the snackbar', function () {
      var div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('hide');
    });
  });

  describe('with a success message', function () {
    beforeEach(function () {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'success', message: 'success'});
    });

    it('should reveal a success snackbar', function () {
      var div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('success');
    });
  });

  describe('with an info message', function () {
    beforeEach(function () {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'info', message: 'info'});
    });

    it('should reveal an info snackbar', function () {
      var div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('info');
    });
  });

  describe('with an error message', function () {
    beforeEach(function () {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'error', message: 'error'});
    });

    it('should reveal an error snackbar', function () {
      var div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('error');
    });
  });

  describe('clicking the close icon', function () {
    beforeEach(function () {
      spies.hide = sinon.stub(SnackbarActions, 'hide');
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    afterEach(function () {
      spies.hide.restore();
    });

    it('should hide the snackbar', function () {
      var icon = TestUtils.findRenderedDOMComponentWithTag(element, 'i');
      TestUtils.Simulate.click(icon);
      expect(spies.hide).to.have.been.called;
    });
  });
```

components/app.jsx
```javascript
var Snackbar = require('./common/snackbar');
var SnackbarStore = require('../stores/snackbar.store');
```

components/app.jsx
```javascript
 <Snackbar />
```


util/progress.js
```
  axios.interceptors.request.use(
    function (config) {
      NProgress.start();
      return config;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      NProgress.done();
      return response;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
  );
```

main.jsx
// Set up the axios interceptors
require('./util/progress')();