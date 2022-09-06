import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import Block, { TProps } from "../../utils/block";

type Props = {
  style: typeof style
} & TProps;

class Page500 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const page500 = new Page500({ style });
