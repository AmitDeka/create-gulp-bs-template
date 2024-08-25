const gulp = require("gulp");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const htmlPartial = require("gulp-html-partial");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const beautify = require("gulp-beautify");
const imagemin = require("gulp-imagemin");
const jsImport = require("gulp-js-import");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");

const rename = require("gulp-rename");
const cleanHTML = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const cleanJS = require("gulp-uglify");

// Check if the environment is production or production with minification
const isProd = process.env.NODE_ENV === "prod";
const isProdm = process.env.NODE_ENV === "prodm";

// Define the source HTML files
var PATHS = {
  srcHtmlPath: "src/",
  srcHtmlPartialPath: "src/partial/",
  srcScssPath: "src/assets/scss/",
  srcJsPath: "src/assets/js/",
  srcImagePath: "src/assets/images/",
  distHtmlPath: "dist/",
  distCssPath: "dist/assets/css/",
  distJsPath: "dist/assets/js/",
  distImagePath: "dist/assets/images/",
};

// Define beautify options of gulp-beautify
const beautifyOptions = {
  indent_size: "2",
  indent_char: " ",
  max_preserve_newlines: "1",
  preserve_newlines: false,
};

// Define rename options of gulp-rename
const renameOptions = {
  suffix: ".min",
};

// Process HTML files, injecting partials and minifying in production
function html() {
  return gulp
    .src(`${PATHS.srcHtmlPath}*.html`)
    .pipe(
      htmlPartial({
        basePath: PATHS.srcHtmlPartialPath,
      })
    )
    .pipe(gulpIf(isProd, beautify.html(beautifyOptions)))
    .pipe(
      gulpIf(
        isProdm,
        cleanHTML({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(gulp.dest(PATHS.distHtmlPath));
}

// Compile Sass to CSS, apply autoprefixer, and minify in production
function css() {
  return gulp
    .src(`${PATHS.srcScssPath}/bootstrap/global.scss`)
    .pipe(gulpIf(isProd || isProdm, sourcemaps.init(".")))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer(["> 0.01%", "not dead"], {
        cascade: true,
      })
    )
    .pipe(gulpIf(isProd, beautify.css(beautifyOptions)))
    .pipe(
      gulpIf(
        isProdm,
        cleanCSS({
          rebase: false,
          level: {
            1: {
              specialComments: 0,
            },
          },
        })
      )
    )
    .pipe(gulpIf(isProdm, rename(renameOptions)))
    .pipe(gulpIf(isProd || isProdm, sourcemaps.write(".")))
    .pipe(gulp.dest(PATHS.distCssPath));
}

// Purge css Task
function purgeCSS() {
  return gulp
    .src(`${PATHS.distCssPath}*.css`)
    .pipe(
      gulpIf(
        isProd || isProdm,
        purgecss({
          keyframes: true,
          variables: true,
          variables: true,
          content: [
            `${PATHS.srcHtmlPath}**/*.html`,
            `${PATHS.srcJsPath}global.js`,
          ],
        })
      )
    )
    .pipe(gulp.dest(PATHS.distCssPath));
}
// Purge css Task

// Process JavaScript files and import dependencies
function js() {
  return gulp
    .src(`${PATHS.srcJsPath}*.js`)
    .pipe(
      jsImport({
        hideConsole: true,
      })
    )
    .pipe(gulpIf(isProd, beautify.js(beautifyOptions)))
    .pipe(gulpIf(isProdm, cleanJS()))
    .pipe(gulpIf(isProdm, rename(renameOptions)))
    .pipe(gulp.dest(PATHS.distJsPath));
}

// Optimize and minify images in production
function img() {
  return gulp
    .src(`${PATHS.srcImagePath}**/*.*`)
    .pipe(
      gulpIf(
        isProd || isProdm,
        imagemin({
          verbose: true,
        })
      )
    )
    .pipe(gulp.dest(PATHS.distImagePath));
}

// Initialize BrowserSync server and open the project in the browser
function serve() {
  browserSync.init({
    open: true,
    server: "./dist",
  });
}

// Reload the browser with BrowserSync
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch for file changes and run the corresponding tasks
function watchFiles() {
  gulp.watch(
    `${PATHS.srcHtmlPath}**/*.html`,
    gulp.series(html, browserSyncReload)
  );
  gulp.watch(
    `${PATHS.srcScssPath}**/*.scss`,
    gulp.series(css, browserSyncReload)
  );
  gulp.watch(
    `${PATHS.srcJsPath}/**/*.scss`,
    gulp.series(js, browserSyncReload)
  );
  gulp.watch(`${PATHS.srcImagePath}**/*.*`, gulp.series(img));
  return;
}

// Clean the 'dist' directory before building the project
function del() {
  return gulp.src("dist/*", { read: false }).pipe(clean());
}

// Define Gulp tasks
exports.html = html;
exports.js = js;
exports.css = css;
exports.del = del;
exports.purgeCSS = purgeCSS;

// Serve task: Build the project, watch for changes, and start a local server
exports.serve = gulp.parallel(html, js, css, img, watchFiles, serve);

// Default task: Clean the 'dist' folder, then build HTML, JS, CSS, and images
exports.default = gulp.series(del, html, js, css, purgeCSS, img);
