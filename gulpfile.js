var gulp = require('gulp');

var less = require('gulp-less');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');
var karma = require('gulp-karma');
var path = require('path');

gulp.task('less', function () {
  gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('compress', function() {
  gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('jasmine', function () {
    return gulp.src('dist/scripts/main.js')
        .pipe(jasmine());
});

var testFiles = [  
  'test/client/*.js'
];

gulp.task('test', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('default-test', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/*.js', ['compress']);
    gulp.watch('src/less/*.less', ['less']);
});

// Default Task
gulp.task('dev', ['less', 'compress', 'watch']);

gulp.task('test', ['test','default-test']);