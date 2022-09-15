import Block from "../../utils/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";

type Props = {
  style?: typeof style,
  chatList: Block,
  chat: Block
};

const defaultValues: Pick<Props, "style"> = { style };

export class MessengerLayout extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
