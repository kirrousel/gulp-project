const source = 'source/';
const destFolder = 'build/';

exports.path = {
  image: {
    in: source + 'images/*.*',
    out: destFolder + 'images/'
  },
  cssFolder: {
    in: source + 'css/main.css',
    out: destFolder + 'css/',
    watch: source + 'css/**/*.css'
  },
  htmlFolder: {
    in: source + 'templates/*.pug',
    out: destFolder,
    watch: source + 'templates/**/*.pug'
  },
  svgFolder: {
    in: source + 'svg/*.*',
    out: './source/templates/',
  }
};

exports.config = {
  svgOptions: {
    mode: {
      inline: true,
      symbol: {
        dest: './', // destination folder
        sprite: 'sprite.pug',
      }
    }
  },

  syncOpts: {
    server: {
      baseDir: destFolder,
      index: 'index.html',
      open: false,
      notify: true
    }
  }
};

exports.source = source;
exports.destFolder = destFolder;
