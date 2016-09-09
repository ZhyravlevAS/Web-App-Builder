'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('fonts', function () {
  var source = require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {
  })
    .concat(path.join(conf.paths.src, '/fonts/**/*'));

  return gulp.src(source)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/fonts')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts')));
});

gulp.task('images', function () {
  return gulp.src(path.join(conf.paths.src, '/images/**/*'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/images')));
});

gulp.task('map', function () {
  return gulp.src(path.join(conf.paths.tmp, '/map/*.map'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/map')));
});

gulp.task('extras', function () {
  return gulp.src([
    'src/*.*',
    '!src/*.twig',
    '!src/*.js'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('scripts-min', function () {
  return gulp.src(path.join(conf.paths.dist, '/js/*.js'))
    .pipe($.uglify())

    // Uncomment for create reduced files together with source.
    // Then rename comments like this:
    //    <!-- build:js js/plugins.min.js -->
    //    <!-- build:js js/bootstrap.min.js -->
    //    <!-- build:js js/app.min.js -->
    // To:
    //    <!-- build:js js/plugins.js -->
    //    <!-- build:js js/bootstrap.js -->
    //    <!-- build:js js/app.js -->

    // .pipe($.rename(function (path) {
    //   path.basename += '.min';
    // }))

    .pipe(gulp.dest(path.join(conf.paths.dist, '/js')));
});

gulp.task('styles-min', function () {
  return gulp.src(path.join(conf.paths.dist, '/css/*.css'))
    .pipe($.csso())

    // Uncomment for create reduced files together with source.
    // Then rename comments like this:
    //    <!-- build:css css/plugins.min.css -->
    //    <!-- build:css css/style.min.css -->
    // To:
    //    <!-- build:css css/plugins.css -->
    //    <!-- build:css css/style.css -->

    // .pipe($.rename(function (path) {
    //   path.basename += '.min';
    // }))

    .pipe(gulp.dest(path.join(conf.paths.dist, '/css')));
});

gulp.task('size', function () {
  return gulp.src(path.join(conf.paths.dist, '/**/*')).pipe($.size({title: 'build', gzip: true}));
});

gulp.task('clean', del.bind(null, [conf.paths.tmp, conf.paths.dist]));