import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";
import { TChatList } from "./types";
import Block from "../../utils/block";

type Props = {
  style?: typeof style,
  arrow?: string,
  chats: TChatList[]
};

const defaultValues: Pick<Props, "style" | "arrow"> = { style, arrow };

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
