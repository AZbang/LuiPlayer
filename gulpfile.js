'use strict';

const gulp = require('gulp');
const vueify = require('gulp-vueify');

gulp.task('vueify', () => {
  return gulp.src('src/vue/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./src/renderer'));
});
gulp.task('watch', () => {
	gulp.watch('src/vue/**/*.vue', ['vueify']);
});

gulp.task('default', ['vueify', 'watch']);
