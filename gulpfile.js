const gulp = require('gulp');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify-cli");
const path = require('path');



gulp.task('less', () => {
    return gulp.src(path.join(__dirname, 'less', 'style.less'))
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            plugins: [autoprefix],
            compress: true
        }))
        .pipe(gulp.dest('./css'))
});

gulp.task('babel', () => {
    return gulp.src([
            path.join(__dirname, 'src', 'line_chart.js'),
            path.join(__dirname, 'src', 'bar_chart.js'),
            path.join(__dirname, 'src', 'histogram.js'),
            path.join(__dirname, 'src', 'pos-neg-chart.js'),
            path.join(__dirname, 'src', 'data_parse.js'),
            path.join(__dirname, 'src', 'controls.js'),
            path.join(__dirname, 'src', 'app.js')
        ])
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'))
});

gulp.task('uglify', () => {
        return gulp.src(path.join(__dirname, 'js', 'app.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(__dirname, 'js', 'min')))
    });

gulp.task('build', ['less', 'babel']);

