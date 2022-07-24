import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import dots from "../../../static/images/dots.svg";
import clip from "../../../static/images/clip.svg";
import sendArrow from "../../../static/images/send-arrow.svg";

export const chat = (chatData) => {
  return template({ style, dots, clip, sendArrow, chatData });
};
