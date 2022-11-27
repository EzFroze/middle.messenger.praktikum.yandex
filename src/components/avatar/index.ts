import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import emptySrc from "../../../static/images/empty-avatar.png";
import Block from "../../app/block";

type Props = {
  style?: typeof style,
  src?: string
};

const defaultValues: Pick<Props, "style" | "src"> = {
  style,
  src: emptySrc
};

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
