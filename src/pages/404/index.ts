import Block from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  style: typeof style;
  messengerLink: Block;
};

class Page404 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const page404 = Page404.bind(null, {
  style,
  messengerLink: new Link({
    text: "Назад к чатам",
    to: "/messenger"
  }),
}) as typeof Block;
