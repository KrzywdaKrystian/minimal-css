var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var staticPath = 'static/';
//expanded or compressed
var cssCompressed = {outputStyle: 'expanded'};
var jsCompressed = false;

//tasks
gulp.task('build-sass', buildSass);
gulp.task('watch-sass', watchSass);
gulp.task('build-js', buildJs);
gulp.task('watch-js', watchJs);

//functions
function buildSass() {
    gulp.src('src/scss/minimal.scss')
        .pipe(sass(cssCompressed).on('error', sass.logError))
        .pipe(concat('minimal-css.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(staticPath + '/'))
}

function watchSass() {
    gulp.watch('src/scss/**/*.scss', ['build-sass']);
}

function buildJs() {
    return gulp.src([
        'src/js/*.js',
        'src/js/*/*.js',
        'src/js/*/*/*.js',
        'src/js/*/*/*/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('minimal-css.js'))
        .pipe(gulpif(jsCompressed, uglify({
            mangle: false
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(staticPath + '/'));
}

function watchJs() {
    gulp.watch('src/js/**/*.js', ['build-js']);
}