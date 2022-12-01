import Block from "../../app/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";

type Props = {
  style?: typeof style;
  content: ChildType;
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
