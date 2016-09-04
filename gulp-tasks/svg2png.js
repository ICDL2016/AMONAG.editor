var gulp = require('gulp'),
  svg2png = require('gulp-svg2png');

gulp.task('svg2png', function () {
  gulp.src(['./build/images/svg-single/**/*.svg'])
    .pipe(svg2png())
    .pipe(gulp.dest('./public/assets/i'));
});

