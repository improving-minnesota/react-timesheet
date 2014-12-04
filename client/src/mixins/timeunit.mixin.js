var Router = require('react-router');
var TimeunitStore = require('../stores/timeunit.store');

module.exports = {

  store: TimeunitStore,

  validate: function (event) {
    this.state.timeunit[event.target.name] = event.target.value;
    this.setState(this.state.timeunit);
  }
};
