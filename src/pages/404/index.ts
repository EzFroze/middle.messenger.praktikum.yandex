import Block from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";

type Props = {
  style: typeof style;
  messengerLink: ChildType<Link>;
};

class Page404 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const page404Props: Props = {
  style,
  messengerLink: {
    block: Link,
    props: {
      text: "Назад к чатам",
      to: Routes.MESSENGER_PAGE
    },
    $$type: "child"
  },
};

export const page404: ChildType<Page404> = {
  block: Page404,
  props: page404Props,
  $$type: "child"
};
