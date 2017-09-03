const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
    return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('js', () =>{

});

gulp.task('dist', ['scss', 'js'], () => {
    
});