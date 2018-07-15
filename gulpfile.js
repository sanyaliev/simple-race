"use strict";

var browserSync = require('browser-sync').create(),
    gulp = require('gulp');

var baseDir = "./";

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: baseDir
    },
    open: true,
    ghostMode: false
  });
});