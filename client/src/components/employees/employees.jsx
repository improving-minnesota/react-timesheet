var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');
var EmployeeActions = require('../../actions/employee.actions');
var EmployeeStore = require('../../stores/employee.store');
var Paginator = require('../common/navigation/paginator');

var Employees = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State
  ],

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

  render: function () {

    var numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    var pagesShown = Math.min(numPages, 5);

    return (
      <div>
        {/* TODO - Add a button to open the create employee route */}

        <div className="row">
          <EmployeeTable employees={this.state.pageConfig.data} store={this.store} />
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
      </div>
      </div>
    );
  }
});

module.exports = Employees;
