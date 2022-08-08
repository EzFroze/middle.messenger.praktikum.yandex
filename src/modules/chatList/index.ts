import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";
import { TChatList } from "./types";

export const chatList = (chats: TChatList[]) => {
  return template({ style, arrow, chats });
};
