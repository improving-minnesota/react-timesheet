** Flux ** 

flux/flux.dispatcher.js
```javascript
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
```

flux/flux.dispatcher.spec.js
```javascript
  describe('handling a view action', function () {
    it('should dispatch the action with a source of VIEW_ACTION', function () {
      dispatcher.handleViewAction('testAction');
      expect(spies.dispatch).to.have.been.calledWith({source: 'VIEW_ACTION', action: 'testAction'});
    });
  });
```

flux/flux.store.js
```javascript
  state: {},

  getState: function () {
    return this.state;
  },

  setState: function (state) {
    this.state = _.extend(this.state, state);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  register: function (events) {
    var self = this;

    dispatcher.register(function (payload) {
      var action = payload.action;
      var promise = events[action.actionType];

      if (!_.isUndefined(promise)) {
        promise.apply(self, [payload])
          .then(function () {
            self.emitChange();
          });
      }
      return true;
    });
  }
```

actions/employee.actions.js
```javascript
  LIST: 'LIST_EMPLOYEES',
  GET: 'GET_EMPLOYEE',
  CREATE: 'CREATE_EMPLOYEE',
  UPDATE: 'UPDATE_EMPLOYEE',
  DELETE: 'DELETE_EMPLOYEE',
  RESTORE: 'RESTORE_EMPLOYEE',

  list: function (query) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.LIST,
      query: query
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.GET,
      employee: {_id: id}
    });
  },

  create: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.CREATE,
      employee: employee
    });
  },

  update: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.UPDATE,
      employee: employee
    });
  },

  remove: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.DELETE,
      employee: employee
    });
  },

  restore: function (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.RESTORE,
      employee: employee
    });
  }
```

actions/employee.actions.spec.js
```javascript
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    EmployeeActions = require('./employee.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the EmployeeActions', function () {
    expect(EmployeeActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      EmployeeActions.list(query);

      payload = {query: query, actionType: EmployeeActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      EmployeeActions.get(id);

      payload = {employee: {_id: id}, actionType: EmployeeActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      EmployeeActions.create(employee);

      payload = {employee: employee, actionType: EmployeeActions.CREATE};
    });

    it('should dispatch a view action with the employee and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      EmployeeActions.update(employee);

      payload = {employee: employee, actionType: EmployeeActions.UPDATE};
    });

    it('should dispatch a view action with the employee and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      EmployeeActions.remove(employee);

      payload = {employee: employee, actionType: EmployeeActions.DELETE};
    });

    it('should dispatch a view action with the employee and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      EmployeeActions.restore(employee);

      payload = {employee: employee, actionType: EmployeeActions.RESTORE};
    });

    it('should dispatch a view action with the employee and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
```

actions/timesheet.actions.js
```javascript
  LIST: 'LIST_TIMESHEETS',
  GET: 'GET_TIMESHEET',
  CREATE: 'CREATE_TIMESHEET',
  UPDATE: 'UPDATE_TIMESHEET',
  DELETE: 'DELETE_TIMESHEET',
  RESTORE: 'RESTORE_TIMESHEET',

  list: function (query) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.LIST,
      query: query
    });
  },

  get: function (id) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.GET,
      timesheet: {_id: id}
    });
  },

  create: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.CREATE,
      timesheet: timesheet
    });
  },

  update: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.UPDATE,
      timesheet: timesheet
    });
  },

  remove: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.DELETE,
      timesheet: timesheet
    });
  },

  restore: function (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.RESTORE,
      timesheet: timesheet
    });
  }
```

actions/timesheet.actions.spec.js
```javascript
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(function () {
    TimesheetActions = require('./timesheet.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(function () {
    dispatcher.restore();
  });

  it('should instantiate the TimesheetActions', function () {
    expect(TimesheetActions).to.be.defined;
  });

  describe('firing a list action', function () {
    beforeEach(function () {
      query = "query";
      TimesheetActions.list(query);

      payload = {query: query, actionType: TimesheetActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', function () {
    beforeEach(function () {
      id = "testId";
      TimesheetActions.get(id);

      payload = {timesheet: {_id: id}, actionType: TimesheetActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', function () {
    beforeEach(function () {
      TimesheetActions.create(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.CREATE};
    });

    it('should dispatch a view action with the timesheet and a type of LIST', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', function () {
    beforeEach(function () {
      TimesheetActions.update(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.UPDATE};
    });

    it('should dispatch a view action with the timesheet and a type of UPDATE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', function () {
    beforeEach(function () {
      TimesheetActions.remove(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.DELETE};
    });

    it('should dispatch a view action with the timesheet and a type of DELETE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', function () {
    beforeEach(function () {
      TimesheetActions.restore(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.RESTORE};
    });

    it('should dispatch a view action with the timesheet and a type of RESTORE', function () {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
```

stores/employee.store.js
```javascript
  initialize: function () {
    var events = {};
    events[actions.LIST]    = this.list;
    events[actions.GET]     = this.get;
    events[actions.UPDATE]  = this.update;
    events[actions.DELETE]  = this.remove;
    events[actions.RESTORE] = this.restore;
    events[actions.CREATE]  = this.create;
    this.register(events);

    this.setState({
      employee: {},
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    return this;
  },

  url: function (employeeId) {
    var url = '/users';
    if (employeeId) {
      url += '/' + employeeId;
    }

    return url;
  },

  list: function (payload) {
    var self = this;

    return axios.get(this.url(), {params: payload.action.query})
      .then(function (res) {
        self.setState({pageConfig: res.data});
      })
      .catch(function (x) {
        console.log('Error attempting to retrieve employees.');
      });
  },

  get: function (payload) {
    var self = this;

    return axios.get(this.url(payload.action.employee._id))
      .then(function (res) {
        self.setState({employee: res.data});
        return true;
      })
      .catch(function (data) {
        console.log('There was an error getting the employee');
      });
  },

  update: function (payload) {
    var self = this;
    var employee = payload.action.employee;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + employee.username + ', updated.');
      })
      .catch(function (x) {
        console.log('There was an error updating employee.');
      });
  },

  remove: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = true;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to delete employee.');
      });
  },

  restore: function (payload) {
    var self = this;
    var employee = payload.action.employee;
    employee.deleted = false;

    return axios.put(this.url(employee._id), employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', was restored.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to restore employee.');
      });
  },

  create: function (payload) {
    var self = this;

    return axios.post(this.url(), payload.action.employee)
      .then(function (res) {
        self.setState({employee: res.data});
        console.log('Employee : ' + res.data.username + ', created.');
      })
      .catch(function (x) {
        console.log('There was an error creating employee.');
      });
  }
```

stores/timesheet.store.js
```javascript
  initialize: function () {
    var events = {};
    events[actions.LIST]    = this.list;
    events[actions.GET]     = this.get;
    events[actions.UPDATE]  = this.update;
    events[actions.DELETE]  = this.remove;
    events[actions.RESTORE] = this.restore;
    events[actions.CREATE]  = this.create;
    this.register(events);

    this.setState({
      timesheet: {},
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    return this;
  },

  url: function (timesheetId) {
    var url = 'users/all/timesheets';
    if (timesheetId) {
      url += '/' + timesheetId;
    }

    return url;
  },

  list: function (payload) {
    var self = this;

    return axios.get(this.url(), {params: payload.action.query})
      .then(function (res) {
        self.setState({pageConfig: res.data});
      })
      .catch(function (x) {
        console.log('Error attempting to retrieve timesheets.');
      });
  },

  get: function (payload) {
    var self = this;

    return axios.get(this.url(payload.action.timesheet._id))
      .then(function (res) {
        self.setState({timesheet: res.data});
        return true;
      })
      .catch(function (data) {
        console.log('There was an error getting the timesheet');
      });
  },

  update: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', updated.');
      })
      .catch(function (x) {
        console.log('There was an error updating timesheet.');
      });
  },

  remove: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = true;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to delete timesheet.');
      });
  },

  restore: function (payload) {
    var self = this;
    var timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        console.log('Error attempting to restore timesheet.');
      });
  },

  create: function (payload) {
    var self = this;

    return axios.post(this.url(), payload.action.timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        console.log('Timesheet : ' + timesheet.name + ', created.');
      })
      .catch(function (x) {
        console.log('There was an error creating timesheet.');
      });
  }
```

components/employees.js

** Notice the event handlers in the jsx

```javascript

  store: EmployeeStore,

  requestEmployees: EmployeeActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.requestEmployees({page: 1});
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange: function (page) {
    this.requestEmployees({page: page});
  },

```

components/employee.row.js
```javascript

EmployeeActions.remove(this.props.employee);

EmployeeActions.restore(this.props.employee);
```

components/employee.row.spec.js

** uncomment the spies already written

```javascript
it('should fire a remove employee action', function () {
  expect(spies.remove).to.have.been.calledWith(employee);
});

it('should fire a restore employee action', function () {
  expect(spies.restore).to.have.been.calledWith(employee);
});
```

components/timesheets.js
```javascript
  store: TimesheetStore,

  requestTimesheets: TimesheetActions.list,

  getInitialState: function () {
    return this.store.getState();
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.requestTimesheets({page: 1});
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange: function (page) {
    this.requestTimesheets({page: page});
  },
```

components/timesheet.row.js
```javascript

TimesheetActions.remove(this.props.timesheet);

TimesheetActions.restore(this.props.timesheet);

```

components/timesheet.row.spec.js
```javascript
it('should fire a remove timesheet action', function () {
  expect(spies.remove).to.have.been.calledWith(timesheet);
});

it('should fire a restore timesheet action', function () {
  expect(spies.restore).to.have.been.calledWith(timesheet);
});

```
