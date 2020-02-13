import { series, watch } from "gulp";
import { path } from "../helpers";
import { css } from "./css";
import { html } from "./html";
import { browserSyncReload } from "./browsersync";
import { images } from "./images";
import { svg } from "./svg";

export const watchFiles = () => {
  watch(path.cssFolder.watch, css);
  watch(path.htmlFolder.watch, series(html, browserSyncReload));
  watch(path.image.in, images);
  watch(path.svgFolder.in, svg);
};
