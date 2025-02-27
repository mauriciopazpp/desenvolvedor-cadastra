const history = require("connect-history-api-fallback");
const { series, src, dest, parallel, watch } = require("gulp");
const webpack = require("webpack");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const webpackConfig = require("./webpack.config.js");

const paths = {
  scripts: {
    src: "src/ts/index.tsx",
    watch: "src/ts/**/*.{ts,tsx}",
  },
  styles: {
    src: "src/scss/main.scss",
    watch: "src/scss/**/*.scss",
    dest: "dist/css",
  },
  img: {
    src: "src/img/**/*",
  },
  dest: "dist",
};

function clean() {
  return del([paths.dest]);
}

function server() {
  browserSync.init({
    server: {
      baseDir: paths.dest,
      middleware: [history({})],
      index: "index.html"
    },
    notify: false,
    open: false,
    serveStatic: [paths.dest],
    csp: {
      policies: {
        "default-src": "'self'",
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "http://localhost:3000"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
        "connect-src": ["'self'", "ws://localhost:3000"],
        "img-src": ["'self'", "data:"]
      },
    },
  });
}

function styles() {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ quietDeps: true }).on('error', function(error) {
      console.error(error.message);
      this.emit('end');
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
    .pipe(browserSync.stream({ match: '**/*.css' }));
}

function scripts() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error("Webpack error:", err);
        return reject(err);
      }

      if (stats.hasErrors()) {
        console.error(
          stats.toString({
            colors: true,
            chunks: true,
            modules: false,
            entrypoints: true,
            errors: true,
            errorDetails: true,
          })
        );
        return reject(new Error("Webpack compilation failed"));
      }

      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          modules: false,
          version: false,
          hash: false,
          timings: false,
        })
      );

      browserSync.reload();
      resolve();
    });
  });
}

function img() {
  return src(paths.img.src)
    .pipe(dest(paths.dest + "/img"));
}

const build = series(clean, parallel(styles, scripts, img));

const dev = series(build, function startDev(done) {
  server();
  watch(paths.scripts.watch, series(scripts, reloadBrowser));
  watch(paths.styles.watch, series(styles, reloadBrowser));
  watch(paths.img.src, series(img, reloadBrowser));
  done();
});

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

exports.build = build;
exports.server = server;
exports.styles = styles;
exports.scripts = scripts;
exports.default = dev;
