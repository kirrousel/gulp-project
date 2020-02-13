import {dest, src} from "gulp";
import {config, path} from "../helpers";
import svgSprite from "gulp-svg-sprite";

export const svg = () => {
  return src(path.svgFolder.in)
    .pipe(svgSprite(config.svgOptions))
    .pipe(dest(path.svgFolder.out))
};
