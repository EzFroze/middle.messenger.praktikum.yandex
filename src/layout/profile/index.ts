import template from "./index.hbs";
import style from "./styles.module.pcss";

import arrow from "../../../static/images/send-arrow.svg";
import Block from "../../app/block";
import { Link } from "../../components/exports";

type Props = {
  style?: typeof style;
  content: Block;
  messengerLink?: Block;
};

const defaultValues: Pick<Props, "style" | "messengerLink"> = {
  style,
  messengerLink: new Link({
    to: "/messenger",
    text: `<img src="${arrow}" alt="arrow" class="${style.arrow}" />`,
  }),
};

export class ProfileLayout extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
