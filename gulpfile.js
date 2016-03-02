"use strict";

const gulp        = require("gulp");
const babel       = require("gulp-babel");
const concat      = require("gulp-concat");
const sass        = require("gulp-sass");
const sourcemaps  = require("gulp-sourcemaps");
const uglify      = require("gulp-uglify");
const rimraf      = require("rimraf");

const config =  {
  paths: {
    src: "src",
    sass: "sass/**/*.scss",
    js: "js/**/*.js",
    html: "partials/**/*.html",
    bower_components: "bower_components/**/*"
  }
};

//Empties the public/css directory
gulp.task("clean-css", (cb) => {
  rimraf("public/css", cb);
});

//Empites the public/js directory
gulp.task("clean-js", (cb) => {
  rimraf("public/js", cb);
});


//Empties the public/partials directory
gulp.task("clean-partials", (cb) => {
  rimraf("public/partials", cb);
});

//Empites the public/bower_components directory
gulp.task("clean-bower_components", (cb) => {
  rimraf("public/bower_components", cb);
});

//Copies bower_components into the public directory
gulp.task("bower_components", ["clean-bower_components"], () => {
  return gulp.src(`${config.paths.src}/${config.paths.bower_components}`)
    .pipe(gulp.dest("public/bower_components"));
});

//Converts the scss files into css
gulp.task("sass", ["clean-css"], () => {
  return gulp.src(`${config.paths.src}/${config.paths.sass}`)
    .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/css"));
});

//Converts js into ES5, will later minify, uglify, & sourcemap
gulp.task("js", ["clean-js"], () => {
  return gulp.src(`${config.paths.src}/${config.paths.js}`)
    .pipe(sourcemaps.init())
      .pipe(concat("bundle.js"))
      .pipe(babel())
      .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/js"));
});

gulp.task("partials", ['clean-partials'], function() {
  return gulp.src(`${config.paths.src}/${config.paths.html}`)
  .pipe(gulp.dest('public/partials'));
});

gulp.task("build", ["sass", "js", "partials", "bower_components"]);

//Watches all files for changes
gulp.task("watch", () => {
  var sassWatch = gulp.watch(config.paths.sass, {cwd: config.paths.src}, ["sass"]);
  sassWatch.on("change", (event) => {
    console.log(`File ${event.path} was ${event.type}.`);
  });
});

gulp.task("default", ["build", "watch"]);
