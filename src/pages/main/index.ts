import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import Block, { TProps } from "../../utils/block";

type Props = {
  style: typeof style
} & TProps;

class MainPage extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return template(this.props);
  }
}

export const mainPage = new MainPage({ style });
