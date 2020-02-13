import del from "del";
import {destFolder} from "../helpers";

export const clean = (cb) => {
  del([
    destFolder + '*'
  ]);
  cb();
};
