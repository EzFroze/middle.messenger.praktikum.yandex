import template from "./index.hbs";
import style from "./styles.module.pcss";

import { emptyAvatar as emptySrc } from "../../../static/images";
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
