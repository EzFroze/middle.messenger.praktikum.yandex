import * as style from "./styles.module.pcss";
import template from "./index.hbs";

export const profileLayout = (content) => {
  return template({ style, content });
};
