import Block from "../../app/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";

type Props = {
  style?: typeof style,
  key: string,
  value: string
};

const defaultValues = { style };

export class ProfileInfoBlock extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
