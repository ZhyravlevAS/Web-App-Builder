'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var util = require('util');

var conf = require('./conf');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
      '/.tmp': '.tmp'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
    port: 3001
  };

  var ui = {
    port: 3002
  };

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    ui: ui
  });
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([conf.paths.tmp, conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});