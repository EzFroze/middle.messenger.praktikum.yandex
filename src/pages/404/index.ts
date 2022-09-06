import Block from "../../utils/block";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  style: typeof style
};

class Page404 extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const page404 = new Page404({ style });
