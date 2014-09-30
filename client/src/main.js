/** @jsx React.DOM */

var React = require('react');
var AppRouter = require('./routes');

// Initialize the rest api
require('./data/resources')();

// Initialize the routes
React.renderComponent(<AppRouter />, document.getElementById('app'));
        