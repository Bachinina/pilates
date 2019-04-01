"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function () {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src(
      "source/img/**/{icon}-*.svg"
    )
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))

    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
  ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/img/**",
    "source/js/**"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("svg", function (done) {
  run(
    "sprite",
    "html",
    "copy",
    done
  );
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]).on("change", server.reload);
  gulp.watch("source/*.html", ["html"])
    .on("change", server.reload);
  gulp.watch("source/img/*.{img, png}", ["copy"])
    .on("change", server.reload);
  gulp.watch("source/img/**/*.svg", ["svg"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["copy"])
    .on("change", server.reload);
});

gulp.task("build", function (done) {
  run(
    "clean",
    "style",
    "sprite",
    "copy",
    "html",
    done
  );
});
