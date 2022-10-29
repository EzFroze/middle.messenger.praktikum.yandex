import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";
import Block from "../../app/block";
import { Link } from "../../components";
import { TChatList } from "./types";

type Props = {
  style?: typeof style;
  chats: TChatList[];
  profileLink?: Block;
};

const defaultValues: Pick<Props, "style" | "profileLink"> = {
  style,
  profileLink: new Link({
    to: "/profile",
    text: `Профиль <img src="${arrow}" alt="arrow">`,
    className: style.profile,
  }),
};

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
