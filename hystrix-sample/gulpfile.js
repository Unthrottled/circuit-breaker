var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');

var contentDirectory = 'angular-project/';
var destinationDirectory = 'src/main/resources/static/';

gulp.task('bower', function() {
    return bower();
});

gulp.task('clean', function(){
    del([destinationDirectory+'/*/*', '!'+destinationDirectory+'bower_components/**'],{dryRun: true}).then(function(paths){
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('js', function () {
    gulp.src([contentDirectory +'js/**/*.js'])
        .pipe(concat('angular-app.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(destinationDirectory + 'js'));
});

gulp.task('css', function() {
    gulp.src([contentDirectory+ 'css/**/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest(destinationDirectory + 'css'));

});

gulp.task('html', function(){
   gulp.src([contentDirectory + 'templates/**/*.html'])
       .pipe(gulp.dest(destinationDirectory + 'templates'));
});

gulp.task('images', function(){
   gulp.src([contentDirectory + 'images/**/*'])
       .pipe(gulp.dest(destinationDirectory + 'images'));
});

// Default Task
gulp.task('default', ['clean','bower','css', 'js','html', 'images']);