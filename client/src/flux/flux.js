var Fluxxor = require('fluxxor');
var stores = require('./flux.stores');
var actions = require('./flux.actions');

module.exports = new Fluxxor.Flux(stores, actions);