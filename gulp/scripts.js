'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('scripts-reload', function () {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return buildScripts();
});

var buildScripts = function () {
  return gulp.src(path.join(conf.paths.src, '/js/*.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/js')));
};