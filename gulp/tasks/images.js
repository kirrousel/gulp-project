import {dest, src} from "gulp";
import {path} from "../helpers";
import newer from "gulp-newer";
import imageMin from "gulp-imagemin";

export const images = () => {
  return src(path.image.in)
    .pipe(newer(path.image.out))
    .pipe(imageMin())
    .pipe(dest(path.image.out));
};
