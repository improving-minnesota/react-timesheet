** Forms and Validation **

Mixins have been added..

Server team has added security

---------------------------------
Routes 

routes.jsx
```javascript
<Route name='login' path='/login' handler={Login} />

<Route name='app' path="/" handler={App}>

  <Route name='projects'          path='/projects'              handler={Projects} />
  <Route name='projects.detail'   path='/projects/detail/:_id'  handler={ProjectsDetail} />
  <Route name='projects.create'   path='/projects/create'       handler={ProjectsCreate} />

  <Route name='employees'         path='/employees'             handler={Employees} />
  <Route name='employees.detail'  path='/employees/detail/:_id' handler={EmployeesDetail} />
  <Route name='employees.create'  path='/employees/create'      handler={EmployeesCreate} />

  <Route name='timesheets'        path='/employees/:user_id/timesheets'             handler={Timesheets} />
  <Route name='timesheets.create' path='/employees/:user_id/timesheets/create'      handler={TimesheetsCreate} />
  <Route name='timesheets.detail' path='/employees/:user_id/timesheets/detail/:_id' handler={TimesheetsDetail} />

  <Route name='timesheets.detail.timeunits.create' path='/employees/:user_id/timesheets/detail/:_id/timeunits/create'            handler={TimeunitsCreate} />
  <Route name='timesheets.detail.timeunits.detail'   path='/employees/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id' handler={TimeunitsEdit} />

  <Redirect to="employees" />
</Route>
```

----------------------------------
Login

Checkout LoginStore and LoginActions (current())

main.jsx
```javascript
// Attempt to get a current user session
LoginStore.current()
  .then(function () {

    // initialize the router and its routes
    Router.run(routes, function (Handler) {
      React.render(<Handler />, document.getElementById('app'));
    });
  });
```

components/app.jsx
```javascript
  statics: {
    willTransitionTo: function (transition, params) {
      return LoginStore.requireAuthenticatedUser(transition);
    }
  },
```

components/app.spec.js
```javascript
  describe('during the will transition to lifecyle', function () {
    it('should require an authenticated user from the login store', function () {
      App.willTransitionTo('transitionArg', 'paramsArg');
      expect(proxies['../stores/login.store'].requireAuthenticatedUser).to.have.been.calledWith('transitionArg');
    });
  });
```


components/login/login.jsx
```javascript

  store: LoginStore,

  getInitialState: function () {
    return this.store.getState();
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  validate: function (event) {
    this.state.credentials[event.target.name] = event.target.value;
    this.setState(this.state.credentials);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    LoginActions.login(this.state.credentials);
  },

  render: function () {
    return (
      <div className="ui padded page grid">
        <div className="two column centered row">
          <div className="left aligned column">
            <h4>Welcome to Timesheetz</h4>
          </div>
          <div className="right aligned column">
            <h5>Please Login</h5>
          </div>
        </div>

        <hr/>

        <div className="centered row">
          <div className="center aligned eight wide column">
            <form className="ui form" name="loginForm" onSubmit={this.handleSubmit}>
              <div className="inline field">
                <label htmlFor="login">Username</label>
                <input type="text"
                  name="username" ref="login"
                  value={this.state.credentials.username}
                  onChange={this.validate} required />
              </div>
              <div className="inline field">
                <label htmlFor="pass">Password</label>
                <input type="password"
                  name="password" ref="password"
                  value={this.state.credentials.password}
                  onChange={this.validate} required />
              </div>
              <div className="ui right aligned column">
                <button className="ui primary login button">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
```

----------------------------------
Employees

components/employees.form.jsx
```javascript
  propTypes: {
    employee:   React.PropTypes.object,
    errors:     React.PropTypes.object,
    validate:   React.PropTypes.func.isRequired,
    hasErrors:  React.PropTypes.func.isRequired,
    toggleAdmin: React.PropTypes.func,
    onSave: React.PropTypes.func.isRequired
  },

  mixins: [
    Router.Navigation
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('employees');
  },

  render : function () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="employeeForm" onSubmit={this.props.onSave}>

            <TextInput name="username"
              label="Username"
              placeholder="Employee Username"
              value={this.props.employee.username}
              error={this.props.errors.username}
              onChange={this.props.validate} />

            <TextInput name="email"
              label="Email"
              placeholder="Employee Email"
              value={this.props.employee.email}
              error={this.props.errors.email}
              onChange={this.props.validate} />

            <TextInput name="firstName"
              label="First Name"
              placeholder="First Name"
              value={this.props.employee.firstName}
              error={this.props.errors.firstName}
              onChange={this.props.validate} />

            <TextInput name="lastName"
              label="Last Name"
              placeholder="Last Name"
              value={this.props.employee.lastName}
              error={this.props.errors.lastName}
              onChange={this.props.validate} />

            <Checkbox name="admin"
              label="Admin"
              value={this.props.employee.admin}
              onClick={this.props.toggleAdmin}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
```

components/employees.form.spec.js
```javascript
  describe('clicking the cancel button', function () {
    it('should go back to the employees home', function () {
      var cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      var button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('employees');
    });
  });
```


components/employees.create.jsx
```javascript
  mixins : [
    Router.Navigation,
    Router.State,
    EmployeeMixin
  ],

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  getInitialState: function () {
    return {
      saveText: 'Create',
      employee: {
        admin:false
      },
      errors: {}
    };
  },

  saveEmployee: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.create(this.state.employee);
      this.transitionTo('employees');
    }
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
```

components/employees.create.spec.js

**** uncomment the spies ****

```javascript
 describe('saving an employee', function () {
    beforeEach(function () {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the employee passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the employee list', function () {
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
```
components/employees.jsx
```javascript
<div className="row">
  <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
    New Employee
  </button>
</div>

  createNew: function createNew () {
    this.transitionTo('employees.create');
  },
```

components/employees.spec.js
```javascript
  describe('clicking the new employee button', function () {
    it('should transition to the create employee route', function () {
      var button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('employees.create');
    });
  });
```

components/employee.detail.jsx
```javascript
  mixins: [
    Router.Navigation,
    Router.State,
    EmployeeMixin
  ],

  saveEmployee: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.update(this.state.employee);
      this.transitionTo('employees');
    }
  },

  get: function () {
    var employee = this.store.getState().employee;
    if (_.isEmpty(employee)) {
      var employeeId = this.getParams()._id;
      EmployeeActions.get(employeeId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      employee: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  componentDidMount: function () {
    this.get();
  },

  render : function () {
    return (
      <EmployeeForm employee={this.state.employee}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
```

components/employee.detail.spec.js
```javascript
  describe('getting the employee', function () {
    describe('and the employee exists on the store state', function () {
      beforeEach(function () {
        element.store.state.employee = {_id: 'abc123'};
        element.get();
      });

      it('should set the employee on the component state', function () {
        expect(element.state.employee._id).to.equal('abc123');
      });
    });

    describe('and the employee does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get();
      });

      it('should fire a get employee action', function () {
        expect(proxies['../../actions/employee.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an employee', function () {
    beforeEach(function () {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the employee passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/employee.actions'].update).to.have.been.called;
      });

      it('should transition back to the employee list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
```

components/employees/employee.row.jsx
```
  showDetail: function showDetail () {
    var employee = this.props.employee;
    if (employee.deleted) {
      SnackbarActions.error('You cannot edit a deleted employee.');
      return;
    }
    this.props.store.setState({employee: employee});
    this.transitionTo('employees.detail', {_id: employee._id});
  },

  <tr className={classNames} ref={employee._id} onClick={this.showDetail}>
```

components/employees/employee.row.spec.js
```javascript
  describe('clicking the row', function () {
    describe('when the employee is deleted', function () {
      beforeEach(function () {
        employee = {
          _id: 'abc123',
          deleted: true
        };

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        element.showDetail();
      });

      afterEach(function () {
        spies.error.restore();
      });

      it('should display an error in the snackbar', function () {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted employee.');
      });
    });

    describe('when the employee is NOT deleted', function () {
      beforeEach(function () {
        employee = {
          _id: 'abc123',
          username: 'sterlingArcher',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(function () {
        spies.transitionTo.restore();
      });

      it('should set the employee on the stored state', function () {
        expect(element.props.store.getState().employee.username).to.equal('sterlingArcher');
      });

      it('should transition to the detail route', function () {
        expect(spies.transitionTo).to.have.been.calledWith('employees.detail', {_id: 'abc123'});
      });
    });
  });
```

-----------------------------------
Timesheets and Timeunits

components/timesheet.form.jsx
```javascript
  propTypes: {
    timesheet:          React.PropTypes.object,
    saveText:           React.PropTypes.string.isRequired,
    validate:           React.PropTypes.func.isRequired,
    validateBeginDate:  React.PropTypes.func.isRequired,
    validateEndDate:    React.PropTypes.func.isRequired,
    errors:             React.PropTypes.object,
    hasErrors:          React.PropTypes.func.isRequired
  },

  mixins: [
    Router.Navigation,
    Router.State
  ],

  onCancel: function (event) {
    event.preventDefault();
    this.transitionTo('timesheets', {
      user_id: this.getParams().user_id
    });
  },

  render : function () {
    return (
      <div className="ui centered grid">
        <div className="fourteen wide column">
          <form className="ui inline form" name="timesheetForm" onSubmit={this.props.onSave}>
            <div className="two fields">
              <TextInput name="name"
                placeholder="Timesheet Name"
                label="Name"
                value={this.props.timesheet.name}
                error={this.props.errors.name}
                onChange={this.props.validate} />

              <TextInput name="description"
                placeholder="Timesheet Description"
                label="Description"
                value={this.props.timesheet.description}
                error={this.props.errors.description}
                onChange={this.props.validate} />
            </div>

            <div className="two fields">
              <DatePicker key='ts-begin'
                name="beginDate"
                label="Begin Date"
                selected={moment(this.props.timesheet.beginDate)}
                value={this.props.timesheet.beginDate}
                onChange={this.props.validateBeginDate}
                error={this.props.errors.beginDate} />

              <DatePicker key='ts-end'
                name="beginDate"
                label="End Date"
                selected={moment(this.props.timesheet.endDate)}
                value={this.props.timesheet.endDate}
                onChange={this.props.validateEndDate}
                error={this.props.errors.endDate} />
            </div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
```

components/timesheet.form.spec.js

**** uncomment the spies ****

```javascript
  describe('clicking the cancel button', function () {
    it('should go back to the timesheets home', function () {
      var cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      var button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('timesheets', {user_id: 'userId'});
    });
  });
```

components/timesheet.detail.jsx
```javascript
  mixins: [
    Router.Navigation,
    Router.State,
    TimesheetMixin
  ],

  saveTimesheet: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.update(this.state.timesheet);
      this.transitionTo('timesheets', {user_id: this.getParams().user_id});
    }
  },

  get: function (timesheetId) {
    var timesheet = this.store.getState().timesheet;
    if (_.isEmpty(timesheet)) {
      TimesheetActions.get(timesheetId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState: function () {
    return {
      saveText: 'Update',
      timesheet: {},
      errors: {}
    };
  },

  onChange: function () {
    this.setState(this.store.getState());
  },

  componentWillMount: function () {
    this.get(this.getParams()._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.store.removeChangeListener(this.onChange);
  },

  render: function () {
    return (
      <div>
        <div className="row">
          <TimesheetForm timesheet={this.state.timesheet}
            saveText={this.state.saveText}
            onSave={this.saveTimesheet}
            errors={this.state.errors}
            validateAll={this.validateAll}
            hasErrors={this.hasErrors}
            validate={this.validate}
            validateBeginDate={this.validateBeginDate}
            validateEndDate={this.validateEndDate} />
        </div>

        <div className="ui divider"></div>

        <Timeunits timesheet={this.state.timesheet} />
      </div>
    );
  }
```

components/timesheet.detail.spec.js
```javascript
 describe('getting the timesheet', function () {
    describe('and the timesheet exists on the store state', function () {
      beforeEach(function () {
        element.store.state.timesheet = {_id: 'abc123'};
        element.get();
      });

      it('should set the timesheet on the component state', function () {
        expect(element.state.timesheet._id).to.equal('abc123');
      });
    });

    describe('and the timesheet does NOT exist in the stored state', function () {
      beforeEach(function () {
        element.get();
      });

      it('should fire a get timesheet action', function () {
        expect(proxies['../../actions/timesheet.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an timesheet', function () {
    beforeEach(function () {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the timesheet passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire an update action', function () {
        expect(proxies['../../actions/timesheet.actions'].update).to.have.been.called;
      });

      it('should transition back to the timesheet list', function () { 
        expect(spies.transitionTo).to.have.been.calledWith('timesheets');
      });
    });
  });
```

components/timesheet.create.jsx
```javascript
  mixins: [
    Router.Navigation,
    Router.State,
    TimesheetMixin
  ],

  getInitialState: function () {
    return {
      saveText: 'Create',
      timesheet: {},
      errors: {}
    };
  },

  saveTimesheet: function (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.create(this.state.timesheet);
      this.transitionTo('timesheets', {user_id: this.getParams().user_id});
    }
  },

  render: function () {
    return (
      <TimesheetForm timesheet={this.state.timesheet}
        saveText={this.state.saveText}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        onSave={this.saveTimesheet}
        validate={this.validate}
        validateAll={this.validateAll}
        validateBeginDate={this.validateBeginDate}
        validateEndDate={this.validateEndDate}/>
    );
  }
```

components/timesheet.create.spec.js
```javascript
 describe('saving a timesheet', function () {
    beforeEach(function () {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', function () {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the timesheet passes validation', function () {
      beforeEach(function () {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(function () {
        spies.hasErrors.restore();
      });

      it('should fire a create action', function () {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the timesheet list', function () {
        expect(spies.transitionTo).to.have.been.calledWith('timesheets', {user_id: 'userId'});
      });
    });
  });
```

Timeunits has already been implemented for you.



































