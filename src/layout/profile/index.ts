import * as style from "./styles.module.pcss";
import template from "./index.hbs";

import arrow from "../../../static/images/send-arrow.svg";

export const profileLayout = (content: string) => {
  return template({ style, arrow, content });
};
