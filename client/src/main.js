/** @jsx React.DOM */

var React = window.React = require('react');
var AppRouter = require('./routes');

// Initialize the routes
React.renderComponent(<AppRouter />, document.getElementById('app'));

// Initialize security
require('./services/security').initialize();
