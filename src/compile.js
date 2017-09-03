const gulp = require('gulp');
const es = require('event-stream');
const less = require('gulp-less');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const path = require('path');

var command = process.argv[2];

console.log('running ' + command + ' under ' + __dirname);

switch(command){
    default:
    case 'default':
    case 'dist':
        compile()
        break;
    case 'watch':
        compile(watch = true, genMaps = true);
        break;
    case 'dev':
        compile(genMaps = true);
        break;
}

function compile(watch = false, genMaps = false){
    //startup the watch if we need it
    if(watch){
        gulp.watch('dist/**/*.*', () => {
            compile(watch = false, genMaps = genMaps);
        });
    }

    //initialize the pipe
    var jsStream = gulp.src('scripts/*.js');
    var lessStream = gulp.src('styles/main.less');

    //init the maps if we need them
    if(genMaps){
        jsStream = jsStream.pipe(sourceMaps.init());
        lessStream = lessStream.pipe(sourceMaps.init());
    }

    //run all the plugins in all the streams
    jsStream = jsStream.pipe(concat('main.js'));
    jsStream = jsStream.pipe(uglify());

    lessStream = lessStream.pipe(less({
        paths: [path.join(__dirname, 'styles')]
    }));

    //write down the maps if we need them
    if(genMaps){
        jsStream = jsStream.pipe(sourceMaps.write());
        lessStream = lessStream.pipe(sourcemaps.write());
    }

    //write the streams to files
    jsStream = jsStream.pipe(gulp.dest('dist'));
    lessStream = lessStream.pipe(gulp.dest('dist'));

    //return a merge of all the streams so anyone can now that we are done here
    return es.merge(jsStream, lessStream);
    
}