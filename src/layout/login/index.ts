import Block from "../../utils/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";

type Props = {
  style?: typeof style,
  content: Block
};

const defaultValues: Pick<Props, "style"> = { style };

export class LoginLayout extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const loginLayout = (content: string) => {
  return template({ style, content });
};
