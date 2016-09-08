'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var prettify = require('gulp-html-prettify');
var removeEmptyLines = require('gulp-remove-empty-lines');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('html', function () {
  return gulp.src(path.join(conf.paths.tmp, '/*.html'))
    .pipe($.useref({searchPath: ['.']}))
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('twig-reload', function () {
  return buildTwig()
    .pipe(browserSync.stream());
});

gulp.task('twig', function () {
  return buildTwig();
});

function buildTwig() {
  return gulp.src('src/*.twig')
    .pipe($.twig())
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(removeEmptyLines({removeComments: false}))
    .pipe(gulp.dest(conf.paths.tmp));
}