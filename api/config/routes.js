// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function (req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes () {
  this.root('application#index');

  this.resources('projects');
  this.resources('users', function () {
    this.resources('timesheets', function () {
      this.resources('timeunits');
    });
  });

  this.resources('login', {only: ['create', 'index']});
  this.resources('logout', {only: ['create']});
};
