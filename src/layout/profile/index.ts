import * as style from "./styles.module.pcss";
import template from "./index.hbs";

import arrow from "../../../static/images/send-arrow.svg";
import Block from "../../utils/block";

type Props = {
  style?: typeof style,
  arrow?: string,
  content: Block
};

const defaultValues: Pick<Props, "arrow" | "style"> = { style, arrow };

export class ProfileLayout extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
