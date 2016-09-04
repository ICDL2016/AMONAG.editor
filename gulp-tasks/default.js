var gulp = require('gulp');
var runSequence = require('run-sequence');


//
gulp.task('default', function () {
  runSequence('del', 'jsconcat', 'copyScript','copyAudio' ,'imagemin', 'copy', 'copyFont', 'pngonlySprite', 'sass', 'jade', 'watch')
})
//gulp.task('default', ['del', 'svgSprite', 'svg2png', 'pngSprite', 'jade', 'watch']);