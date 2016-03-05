"use strict";
const gulp          = require("gulp");
const autoprefixer  = require("gulp-autoprefixer");
const babel         = require("gulp-babel");
const concat        = require("gulp-concat");
const jshint        = require("gulp-jshint");
const sass          = require("gulp-sass");
const sourcemaps    = require("gulp-sourcemaps");
const uglify        = require("gulp-uglify");

const chalk         = require("chalk");
const rimraf        = require("rimraf");

const config =  {
  paths: {
    backend:  [
      "bin/**/*",
      "models/**/*",
      "routes/**/*",
      "app.js"
    ],
    src: "src",
    bower_components: "bower_components/**/*",
    html: "partials/**/*.html",
    images: "images/**/*",
    js: "js/**/*.js",
    sass: "sass/**/*.scss",
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

//Empties the public/images directory
gulp.task("clean-images", (cb) => {
  rimraf("public/images", cb);
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
    .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/css"));
});

//Lints js in the terminal where gulp is run
gulp.task("jsLint", () => {
  return gulp.src(`${config.paths.src}/${config.paths.js}`)
  .pipe(jshint({"esversion": 6}))
  .pipe(jshint.reporter("default"));
});

//Lints js in the terminal where gulp is run
gulp.task("backendLint", () => {
  return config.paths.backend.forEach((path) => {
    gulp.src(path)
      .pipe(jshint({"esversion": 6}))
      .pipe(jshint.reporter("default"));
  });
});

//Copies images from src to public
gulp.task("images", ["clean-images"], () => {
  return gulp.src(`${config.paths.src}/${config.paths.images}`)
    .pipe(gulp.dest("public/images"));
})

//Converts js into ES5, minifies, uglifies, & sourcemaps code
gulp.task("js", ["clean-js", "jsLint"], () => {
  return gulp.src(`${config.paths.src}/${config.paths.js}`)
    .pipe(sourcemaps.init())
      .pipe(concat("bundle.js"))
      .pipe(babel())
      .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/js"));
});

gulp.task("partials", ["clean-partials"], function() {
  return gulp.src(`${config.paths.src}/${config.paths.html}`)
  .pipe(gulp.dest("public/partials"));
});

gulp.task("build", ["backendLint", "bower_components", "images", "js", "partials", "sass"]);

//Watches all files for changes
gulp.task("watch", () => {
  const logChange = (event) => console.log(chalk.white.bgBlack(`File ${chalk.cyan.underline(event.path)} was ${chalk.yellow(event.type)}.`));

  const backendWatch = gulp.watch(config.paths.backend, {cwd: "./"}, ["backendLint"]);
  backendWatch.on("change", (event) => logChange(event));

  const bowerWatch = gulp.watch(config.paths.bower_components, {cwd: config.paths.src}, ["bower_components"]);
  bowerWatch.on("change", (event) => logChange(event));

  const imagesWatch = gulp.watch(config.paths.images, {cwd: config.paths.src}, ["images"]);
  imagesWatch.on("change", (event) => logChange(event));

  const jsWatch = gulp.watch(config.paths.js, {cwd: config.paths.src}, ["js"]);
  jsWatch.on("change", (event) => logChange(event));

  const partialsWatch = gulp.watch(config.paths.html, {cwd: config.paths.src}, ["partials"]);
  partialsWatch.on("change", (event) => logChange(event));

  const sassWatch = gulp.watch(config.paths.sass, {cwd: config.paths.src}, ["sass"]);
  sassWatch.on("change", (event) => logChange(event));
});

gulp.task("default", ["build", "watch"]);
