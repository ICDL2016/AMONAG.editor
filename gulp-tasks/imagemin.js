var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function () {
  return gulp.src('build/images/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('build/images/'));
});