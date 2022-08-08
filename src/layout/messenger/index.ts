import template from "./index.hbs";
import * as style from "./styles.module.pcss";

export const messengerLayout = (chatList: string, chat: string) => {
  return template({ style, chatList, chat });
};
