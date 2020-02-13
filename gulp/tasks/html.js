import {dest, src} from "gulp";
import {path} from "../helpers";
import pug from "gulp-pug";
import htmlClean from "gulp-htmlclean";

export const html = () => {
  let page = src(path.htmlFolder.in).pipe(pug({pretty: true}));
  if (!devBuild) {
    page = page.pipe(htmlClean());
  }
  return page.pipe(dest(path.htmlFolder.out));
};
