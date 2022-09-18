import Block from "../../app/block";
import template from "./index.hbs";

type Props = {
  content: Block
};

export class MessengerLayout extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
