var gulp = require('gulp'),
  merge = require('merge-stream'),
  imagemin = require('gulp-imagemin'),
  spritesmith = require('gulp.spritesmith');

gulp.task('pngonlySprite', function () {
  var spriteData = gulp.src('build/images/png-only-sprite/*.png').pipe(spritesmith({
    imgName: 'png-sprite.png',
    cssName: '_png-sprite.scss',
    padding: 2
  }));
  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/i/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('build/styles/helpers'));
  return merge(imgStream, cssStream);

  //return spriteData.pipe(gulp.dest('public/assets/i/'));
})