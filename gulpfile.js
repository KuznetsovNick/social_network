const { src, dest, parallel, series, task } = require('gulp4');
const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require("gulp-less");
const { watch } = require('gulp');
const fsExtra = require('fs-extra');


function templates(cb) {
    console.log("Templates function");
    src('./pug/*.pug')
        .pipe(pug())
        .pipe(dest('./build/html'));
    cb();
}

function styles(cb) {
    console.log("Styles function");
    src('./less/*.less')
        .pipe(less())
        .pipe(dest('./build/css'));
    cb()
}

function clean(cb) {
    console.log("Clean function");
    fsExtra.emptyDirSync("./build");
    cb();
}

function build(cb) {
    console.log("Build function");
    return parallel(templates, styles)(cb);
}

exports.default = series(clean, build)

watch(["./less", "./pug", "./img", "./js"], exports.default);