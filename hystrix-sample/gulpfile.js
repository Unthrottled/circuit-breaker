var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var bower = require('gulp-bower');

var contentDirectory = 'angular-project/';
var destinationDirectory = 'src/main/resources/static/';

gulp.task('bower', function() {
    return bower();
});

gulp.task('js', function () {
    gulp.src([contentDirectory +'js/**/*.js'])
        .pipe(concat('angular-app.js'))
        .pipe(gulp.dest(destinationDirectory + 'js'))
});

gulp.task('css', function() {
    gulp.src([contentDirectory+ 'css/**/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest(destinationDirectory + 'css'));

});

// Default Task
gulp.task('default', ['bower','css', 'js']);