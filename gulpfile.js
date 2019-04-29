const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/css/scss/main.scss',
        dest: 'src/css'
    }
}

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch('src/css/scss/*.scss', style);
    gulp.watch(['src/*.html', 'src/js/script.js']).on('change', browserSync.reload);
}

exports.watch = watch;

exports.style = style;

const build = gulp.parallel(style, watch);

gulp.task('start', build);