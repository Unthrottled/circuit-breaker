var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var bower = require('gulp-bower');


var destinationDirectory = 'src/main/resources/static/';

gulp.task('bower', function() {
    return bower("install --allow-root");
});

gulp.task('js', function () {
    gulp.src([destinationDirectory +'js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinationDirectory + 'js'))
});

gulp.task('css', function() {

    var cssFiles = [destinationDirectory+ 'css/*.css'];

    gulp.src(cssFiles)
        .pipe(filter("main.css"))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(destinationDirectory + 'css'));

});

// Default Task
gulp.task('default', ['bower','css', 'js']);