'use strict';

const gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  wait = require("gulp-wait"),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync');

const path = {
  src: {
    scss: 'src/scss/main.scss'
  },
  watch: {
    scss: 'src/scss/*.{scss,sass,css}'
  },
  base: './'
};

gulp.task('css:build', () => {
  gulp.src(path.src.scss)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(wait(500))
    .pipe(sass())
    .pipe(prefixer())
    .pipe(rename({basename: 'test'}))
    .pipe(gulp.dest(path.base))
    .pipe(browserSync.reload({stream:true}))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.base));
});
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: path.base
    }
  });
});
gulp.task('watch', () => {
  gulp.watch(path.watch.scss, [ 'css:build' ]);
});
gulp.task('build', [ 'css:build' ]);
gulp.task('default', [ 'build', 'browser-sync', 'watch' ]);