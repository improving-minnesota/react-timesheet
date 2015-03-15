var React = require('react/addons');
var Router = require('react-router');

var EmployeeTable = require('./employee.table');

var Employees = React.createClass({

  getInitialState: function () {
    return {
      pageConfig: {
        data: require('../../../../api/data/users.json').users
      }
    };
  },
  
  // TODO - actually implement this for realz
  render: function () {return (<div />);}

});

module.exports = Employees;
