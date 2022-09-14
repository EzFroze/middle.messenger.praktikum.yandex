import style from "./styles.module.pcss";
import template from "./index.hbs";
import Block, { TProps } from "../../utils/block";

type Props = {
  style?: typeof style,
  label?: string,
  placeholder?: string,
  type: string,
  id: string,
  autofocus?: boolean,
  required?: boolean,
  value?: string,
  error?: string
} & TProps;

const defaultValues: Pick<Props, "autofocus" | "required" | "style" | "value"> = {
  autofocus: false,
  required: false,
  style,
  value: ""
};

export class Input extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
