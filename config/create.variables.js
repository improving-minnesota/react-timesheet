var through = require('through2');
var gutil = require('gulp-util');


module.exports = function (outname) {
  var paths = '';  // where we will push the path names with the @import

  var write = function (file, enc, cb){
    if (file.path != "undefined"){
      paths =  paths + '\n' + '@import "' + file.path + '"';
    }
    cb();
  };

  var flush = function (cb) {  // flush occurs at the end of the concating from write()
    gutil.log(gutil.colors.cyan(paths));  // log it

    var newFile = new gutil.File({  // create a new file
      base: __dirname,
      cwd: __dirname,
      path: __dirname + '/' + outname + '.styl',
      contents: new Buffer(paths)  // set the contents to the paths we created
    });

    this.push(newFile);  // push the new file to gulp's stream
    cb();
  };

  return through.obj(write, flush);  // return it
};
