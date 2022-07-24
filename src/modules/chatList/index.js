import template from "./index.hbs";
import * as style from "./styles.module.pcss";

export const chatList = (chats) => {
  return template({ style, chats });
};
