import {dest, src} from "gulp";
import {path} from "../helpers";
import postcss from "gulp-postcss";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";
import browsersync from "browser-sync";

export const css = () => {
  return src(path.cssFolder.in)
    .pipe(postcss([postcssImport, postcssNested, postcssPresetEnv({stage: 1})]))
    .pipe(dest(path.cssFolder.out))
    .pipe(browsersync.reload({stream: true}));
};
