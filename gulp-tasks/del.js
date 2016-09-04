var gulp = require('gulp');
var del = require('del');

gulp.task('del', function () {
  return del([
    'public/**/*'
  ])
});