var gulp = require('gulp');

gulp.task('copy', function () {
  gulp.src(['build/images/other/**/*'])
    .pipe(gulp.dest('public/assets/i'))
});

gulp.task('copyResources', function () {
  gulp.src('build/resources/*')
    .pipe(gulp.dest('public/'))
});

gulp.task('copyScript', function () {
  gulp.src('build/scripts/main.js')
    .pipe(gulp.dest('public/assets/js'))
});

gulp.task('copyFont', function () {
  gulp.src('build/resources/fonts/**/*')
    .pipe(gulp.dest('public/assets/css/fonts/'))
});

gulp.task('copyAudio', function () {
  gulp.src('build/audio/**/*')
    .pipe(gulp.dest('public/assets/audio/'))
});