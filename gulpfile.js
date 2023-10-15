const { src, dest, parallel, series, task } = require('gulp4');
const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require("gulp-less");
const { watch } = require('gulp');
const fsExtra = require('fs-extra');
const concat = require('gulp-concat');
//const ugly = require('gulp-uglify');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const cleanHTML = require('gulp-htmlmin');
const beautify = require('gulp-beautify');


function templates(cb) {
    src('./pug/*.pug')
        .pipe(pug({
            data: {
                dir: "./build"
            }
        }))
        .pipe(cleanHTML())
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(dest('build/html'));
    cb();
}

function styles(cb) {
    src('./less/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(dest('build/css'));
    cb();
}

function code(cb) {
    src(['./js/client.js', './js/jquery.js', './js/requests.js'])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        //.pipe(concat('server.min.js'))
        //.pipe(ugly())
        .pipe(dest('build/js'));
    src('./js/manager.js')
        .pipe(dest('build/js'));
    cb();
}

function img(cb) {
    src('./img/**')
        .pipe(dest('build/img'));
    cb();
}

function clean(cb) {
    fsExtra.emptyDirSync("./build");
    cb();
}

function build(cb) {
    return parallel(templates, styles, code, img)(cb);
}

exports.default = series(clean, build)

watch(["./less", "./pug", "./img", "./js"], exports.default);