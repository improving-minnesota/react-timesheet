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

gulp.task('core', ['watchify', 'concat:css']);
gulp.task('dev', ['core', 'jade:dev', 'copy:dev']);
gulp.task('prod', ['core', 'jade:prod', 'copy:prod', 'uglify']);

gulp.task('jest', function () {
  return gulp.src('./client/test/unit/**')
    .pipe(jest(pkg.jest));
});

gulp.task('shell:server', shell.task(['nodemon api/server.js']));
gulp.task('shell:debug', shell.task(['node-debug api/server.js']));

gulp.task('clean:index', function (cb) {
  return del(['./client/assets/html/index.html'], cb);
});

gulp.task('jade:dev', ['clean:index'], function () {
  return gulp.src('./api/src/views/index.jade')
    .pipe(jade({
      pretty: true,
      data: {
        env: 'development'
      }
    }))
    .pipe(watch('./api/src/views/index.jade'))
    .pipe(gulp.dest('./client/assets/html'));
});

gulp.task('jade:prod', ['clean:index'], function () {
  return gulp.src('./api/src/views/index.jade')
    .pipe(jade({
      pretty: true,
      data: {
        env: 'production',
        debug: false
      }
    }))
    .pipe(watch('./api/src/views/index.jade'))
    .pipe(gulp.dest('./client/assets/html'));
});

gulp.task('clean:fonts', function (cb) {
  return del(['./client/dist/assets/font'], cb);
});

gulp.task('copy:fonts', ['clean:fonts'], function () {
  var fa = gulp.src('./client/assets/js/font-awesome/fonts/**')
    .pipe(gulp.dest('./client/dist/assets/font/font-awesome'));

  var lato = gulp.src('./client/assets/js/lato/font/**')
    .pipe(gulp.dest('./client/dist/assets/font/lato'));

  return merge(fa, lato);
});

gulp.task('clean:font', function (cb) {
  return del(['./client/dist/' + pkg.name + '/assets/font'], cb);
});

// copy font into dist folder from assets
gulp.task('copy:font', ['copy:fonts', 'clean:font'], function () {
  return gulp.src('./client/assets/font/**')
    .pipe(gulp.dest('./client/dist/' + pkg.name + '/assets/font'));
});

gulp.task('clean:img', function (cb) {
  return del(['./client/dist/' + pkg.name + '/assets/img'], cb);
});

// copy img into dist folder from assets
gulp.task('copy:img', ['clean:img'], function () {
  return gulp.src('./client/assets/img/**')
    .pipe(gulp.dest('./client/dist/assets/img'))
    .pipe(gulp.dest('./client/dist/' + pkg.name + '/assets/img'));
});

gulp.task('clean:dev', function (cb) {
  return del(['./client/dist/' + pkg.name]);
});

gulp.task('copy:index', ['clean:dev'], function () {
  return gulp.src('./client/assets/html/index.html')
    .pipe(gulp.dest('./client/dist/' + pkg.name + '/index.html'));
});

// copy index html into dist folder
gulp.task('copy:dev', ['clean:dev', 'copy:fonts', 'copy:img', 'copy:font'], function () {
  return gulp.src('./client/assets/html/index.html')
    .pipe(gulp.dest('./client/dist/' + pkg.name + '/index.html'));
});

gulp.task('copy:prod', ['copy:fonts', 'copy:img', 'copy:font'], function () {
  return gulp.src(['css/style.min.css', 'js/app.min.js','js/app.min.js.map'], {base: './client/dist/assets'})
    .pipe(gulp.dest('./client/dist/' + pkg.name + '/assets'));
});

gulp.task('uglify', function () {
  return gulp.src('./client/dist/assets/js/app.js')
    .pipe(gulp.dest('./client/dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./client/dist/assets/js'));
});

gulp.task('clean:css', function (cb) {
  return del(['./client/dist/assets/css'], cb);
});

gulp.task('less', ['clean:css'], function () {
  return gulp.src('./client/assets/less/style.less')
    .pipe(less({paths: ['./client/assets/less']}))
    //.pipe(watch('./client/assets/less/**'))
    .pipe(gulp.dest('./client/dist/assets/css'));
});

gulp.task('concat:css', ['less'], function () {
  return gulp.src([
      './node_modules/select2/select2.css',
      './node_modules/nprogress/nprogress.css',
      './client/dist/assets/css/style.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./client/dist/assets/css'))
    .pipe(cssmin())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./client/dist/assets/css'));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./client/src/main.js', watchify.args));

  bundler.transform('browserify-shim');
  bundler.transform('reactify');
  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest('./client/dist/assets/js'));
  }

  return rebundle();
});
