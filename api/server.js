var fs = require('fs'),
  Q = require('q'),
  locomotive = require('locomotive');

locomotive.boot('./api/', process.env.NODE_ENV, function (err, app) {
  if (err){
    throw err;
  }

  // Start the HTTP server
  Q.fcall(function() {
    var deferred = Q.defer();
    var server = app.listen(app.settings.port, function () {
      deferred.resolve();
    });
    return deferred.promise;
  })
  // Then send the ready
  .then(function() {
    console.log("Ready for requests on port %d in %s mode.", app.settings.port, app.settings.env);
    console.log('Returning ready to the parent process if any.');
    if (process.send) {
      process.send({ status: 'ready' });
    }
  });
});
