'use strict';

const gulp = require('gulp');
const vueify = require('gulp-vueify');

gulp.task('vueify', () => {
  return gulp.src('src/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./renderer'));
});
gulp.task('watch', () => {
	gulp.watch('src/**/*.vue', ['vueify']);
});

gulp.task('default', ['vueify', 'watch']);
