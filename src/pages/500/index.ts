import Block, { TProps } from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";

type Props = {
  style: typeof style;
  messengerLink: ChildType<Link>;
} & TProps;

class Page500 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const page500Props: Props = {
  style,
  messengerLink: {
    block: Link,
    props: {
      to: Routes.MESSENGER_PAGE,
      text: "Назад к чатам",
      className: style.link,
    },
    $$type: "child"
  },
};

export const page500: ChildType<Page500> = {
  block: Page500,
  props: page500Props,
  $$type: "child"
};
