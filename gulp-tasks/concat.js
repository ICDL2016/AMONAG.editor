var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  browserify = require('gulp-browserify');

gulp.task('jsconcat', function () {
  return gulp.src('build/scripts/**/*')
    //.pipe(browserify())
    //.pipe(concat('all.js'))
    //.pipe(uglify())
    //.pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
})