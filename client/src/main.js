/** @jsx React.DOM */

var React = require('react');
var AppRouter = require('./routes');

// Initialize the rest api
require('./data/resources')();

// Initialize Flux
var flux = require('./flux/flux');

// Initialize the routes
React.renderComponent(<AppRouter flux={flux} />, document.getElementById('app'));
        