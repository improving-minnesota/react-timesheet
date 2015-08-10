var
  _ =           require('lodash'),
  gulp =        require('gulp'),
  pkg =         require('./package.json'),
  changed =     require('gulp-changed'),
  concat =      require('gulp-concat'),
  filesize =    require('gulp-filesize'),
  gulpif =      require('gulp-if'),
  jade =        require('gulp-jade'),
  jshint =      require('gulp-jshint'),
  less =        require('gulp-less'),
  livereload =  require('gulp-livereload'),
  cssmin =      require('gulp-minify-css'),
  nodemon =     require('gulp-nodemon'),
  notify =      require('gulp-notify'),
  plumber =     require('gulp-plumber'),
  rename =      require('gulp-rename'),
  shell =       require('gulp-shell'),
  sourcemaps =  require('gulp-sourcemaps'),
  uglify =      require('gulp-uglify'),
  gutil =       require('gulp-util'),
  watch =       require('gulp-watch'),
  buffer =      require('vinyl-buffer'),
  source =      require('vinyl-source-stream'),
  watchify =    require('watchify'),
  browserify =  require('browserify'),
  del =         require('del'),
  path =        require('path'),
  reactify =    require('reactify'),
  browserifyShim = require('browserify-shim'),
  merge =       require('merge-stream'),
  karma =       require('karma').server;

// main tasks
gulp.task('core', ['concat:css', 'copy:assets']);
gulp.task('dev',  ['core', 'jade:dev']);
gulp.task('prod', ['core', 'jade:prod', 'uglify']);
gulp.task('init', ['build:css']);

// server tasks
gulp.task('serve:dev', function () {
  nodemon({
    script: './api/server.js',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('serve:prod', function () {
  nodemon({
    script: './api/server.js',
    env: {'NODE_ENV': 'production'}
  });
});

gulp.task('debug', shell.task([pkg.scripts.debug]));

// setup the global watches
gulp.task('watch:dev', function () {
  gulp.watch([client('/less/**/*.less')], ['concat:css']);
  gulp.watch(['./semantic/src/**/*'], ['build:css']);
  gulp.start('dev');
});

gulp.task('watch:prod', function () {
  gulp.watch([client('/less/**/*.less')], ['concat:css']);
  gulp.watch(['./semantic/src/**/*'], ['build:css']);
  gulp.watch([dist('/js/app.js')], ['uglify']);
  gulp.start('prod');
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

// Build index.html
gulp.task('clean:index', function (cb) {
  return del(['./client/dist/index.html'], cb);
});

gulp.task('jade:dev', ['clean:index'], function () {
  return gulp.src('./api/views/index.jade')
    .pipe(plumber())
    .pipe(watch('./api/views/index.jade'))
    .pipe(jade({
      pretty: true,
      data: {
        env: 'development'
      }
    }))
    .pipe(gulp.dest('./client/dist'))
    .pipe(livereload());
});

gulp.task('jade:prod', ['clean:index'], function () {
  return gulp.src('./api/views/index.jade')
    .pipe(plumber())
    .pipe(watch('./api/views/index.jade'))
    .pipe(jade({
      pretty: true,
      data: {
        env: 'production',
        debug: false
      }
    }))
    .pipe(gulp.dest('./client/dist'))
    .pipe(livereload());
});

// clean and copy assets
gulp.task('clean:assets', function (cb) {
  return del([
    dist('/font'),
    dist('/img')], cb);
});

gulp.task('copy:assets', ['clean:assets'], function () {
  var fa = gulp.src('./node_modules/font-awesome/fonts/**')
    .pipe(gulp.dest(dist('/font/font-awesome')));

  var img = gulp.src(client('/img/**'))
    .pipe(gulp.dest(dist('/img')));

  var sem = gulp.src(client('/lib/semantic/themes/**'))
    .pipe(gulp.dest(dist('/css')));

  return merge(fa, img);
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


// Compile and concatenate less into css
gulp.task('concat:css', ['less'], function () {
  return gulp.src([
      './node_modules/nprogress/nprogress.css',
      dist('/css/style.css')
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dist('/css')))
    .pipe(cssmin())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dist('/css')))
    .pipe(livereload())
    .on('error', gutil.log.bind(gutil, 'Error concatenating CSS'));
});

gulp.task('build:css', ['less'], function () {
  return gulp.start('concat:css');
});

// Compile and minify the Javascripts
gulp.task('watchify', function() {
  var bundler = watchify(
    browserify(
      _.extend(watchify.args, {
        entries: ['./client/src/main.jsx'],
        extensions: ['.jsx'],
        transform: [reactify, browserifyShim]
      })
    )
  );

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler
      .bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dist('/js')))
      .pipe(livereload());
  }

  return rebundle();
});

gulp.task('uglify', ['watchify'], function () {
  return gulp.src(dist('/js/app.js'))
    .pipe(gulp.dest(dist('/js')))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dist('/js')))
    .pipe(livereload())
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
