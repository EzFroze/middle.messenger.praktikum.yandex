import template from "./index.hbs";
import * as style from "./styles.module.pcss";

export const loginLayout = (content: string) => {
  return template({ style, content });
};
