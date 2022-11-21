import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import arrow from "../../../static/images/send-arrow.svg";
import Block from "../../app/block";
import { Link } from "../../components";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";

type Props = {
  style?: typeof style;
  content: ChildType;
  messengerLink?: ChildType<Link>;
};

const defaultValues: Pick<Props, "style" | "messengerLink"> = {
  style,
  messengerLink: {
    block: Link,
    props: {
      to: Routes.MESSENGER_PAGE,
      text: `<img src="${arrow}" alt="arrow" class="${style.arrow}" />`,
    },
    $$type: "child"
  },
};

export class SettingsLayout extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
