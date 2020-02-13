// include gulp and plugins
import { series, parallel } from 'gulp';
import pkg from './package.json';

import { images } from "./gulp/tasks/images";
import { html } from "./gulp/tasks/html";
import { css } from "./gulp/tasks/css";
import { browserSync } from "./gulp/tasks/browsersync";
import { svg } from "./gulp/tasks/svg";
import { clean } from "./gulp/tasks/clean";
import { watchFiles } from "./gulp/tasks/watch";

//Show build type
const devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build.');

// Define complex task
export const build = series(clean, parallel(css, images, svg, html));
export default series(build, parallel(watchFiles, browserSync));
