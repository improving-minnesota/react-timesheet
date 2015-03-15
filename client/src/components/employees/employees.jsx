var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');

var Employees = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State
  ],

  getInitialState: function () {
    return {
      pageConfig: {
        data: require('../../../../api/data/users.json').users
      }
    };
  },

  render: function () {

    return (
      <div>
        <div className="row">
          <EmployeeTable employees={this.state.pageConfig.data} />
        </div>
      </div>
    );
  }
});

module.exports = Employees;
