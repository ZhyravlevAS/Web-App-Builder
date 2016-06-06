'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['run-sequence']
});

gulp.task('build', function (callback) {
  return $.runSequence('clean', 'inject', 'html', 'images', 'map', 'extras', 'scripts-min', 'styles-min', 'size', callback)
});