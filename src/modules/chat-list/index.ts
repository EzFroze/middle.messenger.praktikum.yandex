import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";
import Block from "../../app/block";
import { Link } from "../../components";
import { TChatList } from "./types";
import { ChildType } from "../../app/block/typings";

type Props = {
  style?: typeof style;
  chats: TChatList[];
  profileLink?: ChildType<Link>;
};

const defaultValues: Pick<Props, "style" | "profileLink"> = {
  style,
  profileLink: {
    block: Link,
    props: {
      to: "/profile",
      text: `Профиль <img src="${arrow}" alt="arrow">`,
      className: style.profile,
    },
    $$type: "child"
  },
};

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
