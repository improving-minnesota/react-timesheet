** Basic React and Routing

components/common/navigation/navbar.jsx
```javascript
  mixins: [
    Router.State,
    Router.Navigation,
    classes
  ],

  getInitialState: function () {
    return {
      title: 'Timesheetz',
      user: {_id: 'all'}
    };
  },

  render : function () {
    var activeRoutes = _.pluck(this.getRoutes(), 'name').join('.').split('.');

    var projectsClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'projects')
    });

    var employeesClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'employees')
    });

    var timesheetsClasses = this.getClass('item', {
      active: _.contains(activeRoutes, 'timesheets')
    });

    return (
      <div className="ui fixed menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className={projectsClasses} to="projects">Projects</Link>
        <Link className={employeesClasses} to="employees">Employees</Link>
        <Link className={timesheetsClasses} to="timesheets" params={{user_id: this.state.user._id}}>Timesheets</Link>

      </div>
    );
  }
```

components/common/navigation/navbar.spec.js
```javascript
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getRoutes: sinon.stub().returns([{name: 'projects'}])
        }
      },
      '@noCallThru': true
    };

    Navbar = proxyquire('./navbar', proxies);
    element = TestUtils.renderIntoDocument(<Navbar />);
  });

  it('should instantiate the Navbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when navigating between routes', function () {
    it('should set the appropriate active class', function () {
      var Links = TestUtils.scryRenderedComponentsWithType(element, proxies['react-router'].Link);
      var projectLink = TestUtils.findRenderedDOMComponentWithClass(element, 'active');
      expect(projectLink.getDOMNode().innerText).to.equal('Projects');
    });
  });
```

components/employees/employee.row.jsx
```javascript
  propTypes: {
    employee: React.PropTypes.object
  },

  mixins: [
    Router.Navigation,
    Router.State,
    classes
  ],

  remove: function remove (e) {
    e.stopPropagation();
    this.props.employee.deleted = true;
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.employee.deleted = false;
  },

  render: function () {
    var employee = this.props.employee;

    var classNames = this.getClass('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
      'positive': employee.deleted,
      'negative': !employee.deleted
    });

    return (
      <tr className={classNames} ref={employee._id}>

        <td>{employee.username}</td>
        <td>{employee.email}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.admin ? 'Yes' : 'No'}</td>
        <td>
          <button className={buttonClasses} onClick={employee.deleted ? this.restore : this.remove}>
            {employee.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
```

components/employees/employee.row.spec.js
```javascript
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    EmployeeRow = require('./employee.row');
  });

  it('should instantiate the EmployeeRow', function () {
    element = TestUtils.renderIntoDocument(<EmployeeRow employee={{_id: 1}} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
```

components/employees/employee.table.jsx
```javascript
  propTypes: {
    employees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render: function () {
    var key = 1;

    var employeeRows = this.props.employees.map(function (employee) {
      return (
        <EmployeeRow employee={employee} key={++key} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admin</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    );
  }
```

components/employees/employee.table.spec.js
```javascript
 beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    employees = [{}, {}];

    EmployeeTable = require('./employee.table');
    element = TestUtils.renderIntoDocument(
      <EmployeeTable employees={employees} />
    );
  });

  it('should instantiate the EmployeeTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
```

components/employees/employees.jsx

** getInitialState is implemented already for data
```javascript
  mixins: [
    Router.Navigation,
    Router.State
  ],

  render: function () {

    return (
      <div>
        <div className="row">
          <EmployeeTable employees={this.state.pageConfig.data} />
        </div>
      </div>
    );
  }
```

components/employees/employees.spec.js
```javascript
 beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Employees = require('./employees');
    element = TestUtils.renderIntoDocument(<Employees />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the Employees', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
```

components/app.jsx
```javascript
 render : function () {

    return (
      <div>
        <NavBar />
        <div className="container">
          <SectionHeader />
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
```

components/app.spec.js
```javascript
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './common/navigation/navbar': mockComponent('Navbar'),
      './common/section': mockComponent('SectionHeader'),
      'react-router': {
        RouteHandler: mockComponent('RouteHandler')
      }
    };

    App = proxyquire('./app', proxies);
    element = TestUtils.renderIntoDocument(<App />);
  });

  it('should instantiate the App', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
```

main.jsx
```javascript
Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
```

routes.jsx
```javascript
var App = require('./components/app');

var Projects = require('./components/projects/projects');
var Employees = require('./components/employees/employees');
var Timesheets = require('./components/timesheets/timesheets');

module.exports = (
  <Route name='app' path="/" handler={App}>

    <Route name='projects'   path='/projects'  handler={Projects} />
    <Route name='employees'  path='/employees' handler={Employees} />
    <Route name='timesheets' path='/employees/:user_id/timesheets' handler={Timesheets} />
    
    <Redirect to="employees" />
  </Route>
);
```

