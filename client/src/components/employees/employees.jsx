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

  // TODO - replace these with actual implementations
  getInitialState: function () {
    return {pageConfig: {data: [{}], totalItems: 0}};
  },
  store: null,
  onPageChange: null,
  // ERASE THE ABOVE LINES

  render: function () {

    var numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    var pagesShown = Math.min(numPages, 5);

    return (
      <div>
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
