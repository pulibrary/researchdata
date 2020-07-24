"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  del = require("del");

sass.compiler = require("node-sass");

gulp.task("clean", function() {
  return del([
      "css/prds.css",
      "js/prds.js"
  ]);
});

// Compiles Sass to CSS
gulp.task("css", function() {
  return gulp
    .src("./src/sass/prds.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./css"));
});

// Compiles JS
gulp.task("js", function() {
  return gulp
    .src("./src/scripts/prds.js")
    .pipe(gulp.dest("./js"));
});

// Watches for changes in Sass files
gulp.task("watch", function() {
  gulp.watch("./src/sass/**/*.scss", gulp.series("css"));
  gulp.watch("./src/scripts/*.js", gulp.series("js"));
});

// Compiles CSS and JS
gulp.task("compile", gulp.series(["clean", "css", "js"]));
