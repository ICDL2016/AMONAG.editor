var gulp = require('gulp'),
  livereload = require('gulp-livereload');


gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(["build/styles/**/*.scss"], ['sass']);
  gulp.watch(["build/templates/**/*.jade"], ['jade']);
  gulp.watch(["build/scripts/**/*.js"], ['jsconcat']);
  gulp.watch(["build/images/svg-sprite-content/*.svg"], ['sprite']);
  gulp.watch(["build/images/png-only-sprite/*.png"], ['pngonlySprite']);
  gulp.watch(["build/images/svg-single/*.svg"], ['svg2png']);
  gulp.watch(["build/images/svg-single/*.svg"], ['copy']);
  gulp.watch(["build/images/other/**/*"], ['copy']);
});
