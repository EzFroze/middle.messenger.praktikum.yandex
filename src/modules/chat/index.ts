import template from "./index.hbs";
import style from "./styles.module.pcss";

import dots from "../../../static/images/dots.svg";
import clip from "../../../static/images/clip.svg";
import sendArrow from "../../../static/images/send-arrow.svg";
import Block from "../../utils/block";
import { Input } from "../../components/input";

type Props = {
  style?: typeof style,
  dots?: string,
  clip?: string,
  sendArrow?: string,
  chatData?: unknown,
  messageInput: Input
};

const defaultValues: Pick<Props, "dots" | "clip" | "sendArrow" | "style"> = {
  style, sendArrow, dots, clip,
};

export class Chat extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
