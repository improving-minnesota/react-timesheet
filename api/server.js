var fs = require('fs'),
  Q = require('q'),
  locomotive = require('locomotive');

locomotive.boot('./api/', process.env.NODE_ENV, function (err, app) {
  if (err){
    throw err;
  }

  app.get("/", function(req, res) {
      console.log("attempting this : " + __dirname);
      return res.sendfile("index.html", {root: __dirname + '/../client/assets/html'});
  });


  app.listen(app.settings.port, function () {
    console.log("Ready for requests on port %d in %s mode.", app.settings.port, app.settings.env);
    console.log('Returning ready to the parent process if any.');

    if (process.send) {
      process.send({ status: 'ready' });
    }
  });
});
