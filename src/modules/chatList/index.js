import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";

export const chatList = (chats) => {
  return template({ style, arrow, chats });
};
