(function () {
  'use strict';
  // ## Setup
  var _ = require('lodash');
  var del = require("del");
  var gulp = require("gulp");
  var $ = require('gulp-load-plugins')();

  var webpackConfig = require("./webpack.config.js");

  // Sources for generating `index.html`.
  var IndexSources = [
    'index.js',
    'index.html',
    'webpack.config.js',
    'gulpfile.js',
  ];

  // ## Tasks
  // ### task clean
  // /distを削除
  gulp.task("clean", function (done) {
    return del(["dist/*"], done);
  });

  // ### task index
  // indexを移すだけ
  gulp.task("index", ["clean"], function (done) {
    gulp.src('index.html')
      .pipe(gulp.dest('dist'))
      .on('end', function () { done() })
  });

  // ### task webpack
  // webpackを使って main.jsをビルドしdistへ格納
  gulp.task("webpack", ["clean"], function () {
  // gulp.task("webpack", function () {
    return gulp.src("index.js")
      .pipe($.webpack(webpackConfig))
      .pipe(gulp.dest('dist'));
  });

  // ### task build
  // `index.html` と `main.js`をビルド
  gulp.task("build", ["webpack", "index"]);

})();
