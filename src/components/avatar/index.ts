import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import emptySrc from "../../../static/images/empty-image.png";

export const avatar = (src: string) => {
  if (!src) {
    return template({ src: emptySrc, isEmpty: true, style });
  }

  return template({ src, style });
};
