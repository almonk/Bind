var gulp = require('gulp');
var jsx = require('gulp-jsx');
var connect = require('gulp-connect');

gulp.task('default', function() {
  return gulp.src('views/**/*.js')
    .pipe(jsx())
    .pipe(gulp.dest('dist'));
});