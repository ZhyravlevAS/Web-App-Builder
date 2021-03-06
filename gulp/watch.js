'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject', 'fixture:run'], function () {

  gulp.watch(['bower.json'], ['inject-reload', 'fonts']);

  gulp.watch([path.join(conf.paths.src, '/**/*.scss')], ['styles']);

  gulp.watch([
    path.join(conf.paths.tmp, '/**/*.css')
  ], function (event) {
    browserSync.reload(event.path);
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), function (event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.twig'), ['twig-reload']);
  gulp.watch(path.join(conf.paths.fixture, '/**/*.js'), ['fixture:run']);
});
