import Block, { TProps } from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  style: typeof style;
  messengerLink: Block;
} & TProps;

class Page500 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const page500 = Page500.bind(null, {
  style,
  messengerLink: new Link({
    to: "/messenger",
    text: "Назад к чатам",
    className: style.link,
  }),
}) as typeof Block;
