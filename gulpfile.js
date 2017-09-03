const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('css', () => {
    return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: __dirname + '/sass/'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('js', () =>{
    return gulp.src('scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('dist', ['css', 'js'], () => {

});