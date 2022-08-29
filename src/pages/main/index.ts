import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import Block from "../../utils/block";

type Props = {
  style: typeof style
};

class MainPage extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return template(this.props);
  }
}

export const mainPage = new MainPage({ style });
