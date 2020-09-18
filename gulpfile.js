// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }

// exports.default = defaultTask;

const { watch, series, src, dest, parallel } = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

function serve() {
  browserSync.init({
    server: "./app",
  });

  watch("app/scss/*.scss", sassFoo);
  watch("app/*.html").on("change", browserSync.reload);
}

function sassFoo(cb) {
  return src("dist/scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true,
      })
    )
    .pipe(dest("app/css/"))
    .pipe(concat("style.css"))
    .pipe(browserSync.stream());
  cb();
}
function compress() {
  src("dist/js/*.js").pipe(uglify()).pipe(concat("all.js"));
  dest("app/js");
}

function watcher() {
  watch("dist/scss/**/*.scss", series(sassFoo));
}

exports.sassFoo = sassFoo;
exports.compress = compress;
exports.serve = serve;
exports.watcher = watcher;
exports.default = parallel(watcher, serve);

