import Block from "../../app/block";
import template from "./index.hbs";
import { ChildType } from "../../app/block/typings";

type Props = {
  content: ChildType
};

export class MessengerLayout extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
