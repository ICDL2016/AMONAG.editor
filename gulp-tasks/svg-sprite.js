/*
 Let the magic begin
 */
var gulp = require('gulp');
var svg2png = require('gulp-svg2png');
var svgSprite = require('gulp-svg-sprite');

gulp.task('svgSprite', function () {
  return gulp.src('build/images/svg-sprite-content/*')
    .pipe(svgSprite({
      "shape": {
        "spacing": {
          "padding": 1
        }
      },
      "mode": {
        "css": {
          "dest": "./",
          "sprite": "public/assets/i/sprite.svg",
          "prefix": ".ico-",
          "bust": false,
          "dimensions": true,
          "expand": true,
          "render": {
            "scss": {
              "dest": "build/styles/helpers/_sprite.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('pngSprite', ['svgSprite'], function () {
  return gulp.src('public/assets/i/sprite.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('public/assets/i'));
});

gulp.task('sprite', ['pngSprite']);