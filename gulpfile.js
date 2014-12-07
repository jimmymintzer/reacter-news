var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

gulp.task('javascript', ['serve'], function() {
  var bundler = watchify(browserify('./src/app.js', watchify.args));

  bundler.transform('reactify');

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .pipe(plumber())
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest('./dist'))
      .pipe(reload({ stream:true }));
  }

  return rebundle();
});

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream:true}));
});


gulp.task('serve', function() {
  browserSync({
    open: false,
    server: {
      baseDir: './',
      port: '8080'
    }
  });

});

gulp.task('default', ['javascript'], function(){
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('index.html', function() {
    reload({});
  })
});