var gulp = require('gulp');
var pkg = require('./package.json');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var jade = require('gulp-jade');
var jest = require('gulp-jest');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var del = require('del');
var path = require('path');
var reactify = require('reactify');
var browserifyShim = require('browserify-shim');
var merge = require('merge-stream');
var filesConfig = require('./config/files.config');

// main tasks
gulp.task('core', ['watchify', 'concat:css', 'copy:assets']);
gulp.task('dev', ['core', 'jade:dev']);
gulp.task('prod', ['core', 'jade:prod', 'uglify']);

// server tasks
gulp.task('serve:dev', shell.task(['NODE_ENV=development nodemon api/server.js']));
gulp.task('serve:prod', shell.task(['NODE_ENV=production nodemon api/server.js']));
gulp.task('debug', shell.task(['node-debug api/server.js']));

// setup the global watches
gulp.task('watch:dev', ['dev'], function () {
  gulp.watch(client('/less/**/*.less'), function () {
    gulp.start('concat:css');
  });

  gulp.start('dev');
});

gulp.task('watch:prod', function () {
  watch('./client/**/*.less', function () {
    gulp.start('concat:css');
  });

  watch([dist('/js/app.js')], function () {
    gulp.start('uglify');
  });

  gulp.start('prod');
});

// run tests
gulp.task('jest', function () {
  return gulp.src('./client/test/unit/**')
    .pipe(plumber())
    .pipe(watch('./client/test/unit/**/*.js'))
    .pipe(jest(pkg.jest));
});

// Build index.html
gulp.task('clean:index', function (cb) {
  return del(['./client/dist/index.html'], cb);
});

gulp.task('jade:dev', ['clean:index'], function () {
  return gulp.src('./api/src/views/index.jade')
    .pipe(plumber())
    .pipe(watch('./api/src/views/index.jade'))
    .pipe(jade({
      pretty: true,
      data: {
        env: 'development'
      }
    }))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('jade:prod', ['clean:index'], function () {
  return gulp.src('./api/src/views/index.jade')
    .pipe(plumber())
    .pipe(watch('./api/src/views/index.jade'))
    .pipe(jade({
      pretty: true,
      data: {
        env: 'production',
        debug: false
      }
    }))
    .pipe(gulp.dest('./client/dist'));
});

// clean and copy assets
gulp.task('clean:assets', function (cb) {
  return del([
    dist('/font'),
    dist('/img')], cb);
});

gulp.task('copy:assets', ['clean:assets'], function () {
  var fa = gulp.src(client('/js/font-awesome/fonts/**'))
    .pipe(gulp.dest(dist('/font/font-awesome')));

  var lato = gulp.src(client('/js/lato/font/**'))
    .pipe(gulp.dest(dist('/font/lato')));

  var img = gulp.src(client('/img/**'))
    .pipe(gulp.dest(dist('/img')));

  return merge(fa, lato, img);
});

// Compile and concatenate less into css
gulp.task('clean:css', function (cb) {
  return del([dist('/css')], cb);
});

gulp.task('less', ['clean:css'], function () {
  return gulp.src(client('/less/style.less'))
    .pipe(plumber())
    .pipe(less({paths: [client('/less')]}))
    .pipe(gulp.dest(dist('/css')))
    .on('error', gutil.log.bind(gutil, 'Error compiling Less'));
});

gulp.task('concat:css', ['less'], function () {
  return gulp.src([
      './node_modules/select2/select2.css',
      './node_modules/nprogress/nprogress.css',
      dist('/css/style.css')
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dist('/css')))
    .pipe(cssmin())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dist('/css')))
    .on('error', gutil.log.bind(gutil, 'Error concatenating CSS'));
});

// Compile and minify the Javascripts
gulp.task('watchify', function() {
  var bundler = watchify(browserify('./client/src/main.js', watchify.args));

  bundler.transform('browserify-shim');
  bundler.transform('reactify');
  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest(dist('/js')));
  }

  return rebundle();
});

gulp.task('uglify', ['watchify'], function () {
  return gulp.src(dist('/js/app.js'))
  .pipe(gulp.dest(dist('/js')))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest(dist('/js')))
  .on('error', gutil.log.bind(gutil, 'Error during minification.'));
});

// helper to navigate to the dist assets dir
function dist(dest) {
  return './client/dist/assets' + dest;
}

// helper to navigate to the client assets dir
function client(dest) {
  return './client/assets' + dest;
}
