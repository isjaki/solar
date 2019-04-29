const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/css/scss/*.scss',
        dest: 'src/css'
    }
}

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch(paths.styles.src, style);
    gulp.watch(['src/*.html', 'src/js/script.js']).on('change', browserSync.reload);
}

exports.watch = watch;

exports.style = style;

const build = gulp.parallel(style, watch);

gulp.task('start', build);