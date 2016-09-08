'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

gulp.task('styles', function () {
  return buildStyles();
});

var buildStyles = function () {

  var files = require('main-bower-files')('**/*.{sass,scss}');
  files.push(path.join(conf.paths.src, '/components/**/*.{sass,scss}'));

  var injectFiles = gulp.src(files, {read: false});

  var injectOptions = {
    transform: function (filePath) {
      if(/(\/components\/)/.test(filePath)){
        return '@import "../../' + filePath + '";';
      }

      filePath = filePath.replace(conf.paths.src + '/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var sassOptions = {
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  };

  return gulp.src(path.join(conf.paths.src, '/sass/style.scss'))
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.environments.production($.sourcemaps.init()))
    .pipe($.sass.sync(sassOptions).on('error', $.sass.logError))
    .pipe($.autoprefixer(conf.autoprefixerOptions))
    .pipe($.shorthand())
    .pipe($.environments.production($.sourcemaps.write('../map')))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css')));
};