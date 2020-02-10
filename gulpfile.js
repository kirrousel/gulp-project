// include gulp and plugins
const newer = require('gulp-newer');
const postcss = require('gulp-postcss');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const svgSprite = require('gulp-svg-sprite');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const del = require('del');
const { src, dest, watch, series, parallel } = require('gulp');
const pkg = require('./package.json');
const pug = require('gulp-pug');
const browsersync = require('browser-sync');

// file locations
const devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !=='production');

const source = 'source/';
const destFolder = 'build/';
const image =  {
  in: source + 'images/*.*',
  out: destFolder + 'images/'
};

const cssFolder =  {
  in: source + 'css/main.css',
  out: destFolder + 'css/',
  watch: source + 'css/**/*.css'
};

const htmlFolder = {
  in: source + 'templates/*.pug',
  out: destFolder,
  watch: source + 'templates/**/*.pug'
};

const svgFolder = {
  in: source + 'svg/*.*',
  out: './source/templates/',
};

const svgConfig = {
  mode: {
    inline: true,
    symbol: {
      dest: './', // destination folder
      sprite: 'sprite.pug',
    }
  }
};

const syncOpts = {
  server: {
    baseDir: destFolder,
    index: 'index.html',
    open: false,
    notify: true
  }
};



//Show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build.');

// Clean build folder
function clean(cb) {
  del([
    destFolder + '*'
  ]);
  cb();
}

// BrowserSync task
function browserSync() {
  browsersync(syncOpts);
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

//Manage images

function images() {
  return src(image.in)
    .pipe(newer(image.out))
    .pipe(imagemin())
    .pipe(dest(image.out));
}

// Manage svg
  function svg() {
    return src(svgFolder.in)
      .pipe(svgSprite(svgConfig))
      .pipe(dest(svgFolder.out))
  }

// Manage css

function css() {
  return src(cssFolder.in)
    .pipe(postcss([postcssImport, postcssNested, postcssPresetEnv({stage: 1})]))
    .pipe(dest(cssFolder.out))
    .pipe(browsersync.reload({stream: true}));
}

// Manage html

function html() {
  let page = src(htmlFolder.in).pipe(pug({pretty: true}));
  if(!devBuild) {
    page = page.pipe(htmlclean());
  }
  return page.pipe(dest(htmlFolder.out));
}

// Watch files
function watchFiles() {
  watch(cssFolder.watch, css);
  watch(htmlFolder.watch, series(html, browserSyncReload));
  watch(image.in, images);
  watch(svgFolder.in, svg);
}

// Define complex task
const build = series(clean, parallel(css, images, svg, html));


// Export tasks
exports.default = series(build, parallel(watchFiles, browserSync));
exports.browserSync = browserSync;
exports.build = build;
exports.watchFiles = watchFiles;
exports.css = css;
exports.html = html;
exports.images = images;
exports.svg = svg;
