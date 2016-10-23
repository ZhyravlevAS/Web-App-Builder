'use strict';

var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('fixture:run', function () {
  return gulp.src(path.join(conf.paths.fixture, '/**/*.js'))
    .pipe($.restEmulator({port: 3003}));
});