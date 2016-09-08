'use strict';

var path = require('path');
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var _ = require('lodash');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('inject-reload', ['inject'], function () {
  return browserSync.reload();
});

gulp.task('inject', ['styles', 'scripts', 'fonts', 'twig'], function () {

  var injectTo = path.join(conf.paths.src, '/*.twig');

  var injectFiles = gulp.src(
    [
      path.join(conf.paths.tmp, '/**/*.js'),
      path.join(conf.paths.tmp, '/**/*.css')
    ],
    {
      read: false
    }
  );

  var injectOptions = {};

  var wiredepOptions = {
    exclude: ['bootstrap-sass'],
    ignorePath: /^(\.\.\/)*\.\./
  };

  return gulp.src(injectTo)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, wiredepOptions)))
    .pipe(gulp.dest(conf.paths.src));
});