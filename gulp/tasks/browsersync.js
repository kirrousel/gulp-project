import browsersync from "browser-sync";
import {config} from "../helpers";

export const browserSync = () => {
  browsersync(config.syncOpts);
};

export const browserSyncReload = (done) => {
  browsersync.reload();
  done();
};
