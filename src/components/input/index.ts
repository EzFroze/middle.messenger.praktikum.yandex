import Block, { TProps } from "../../app/block";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  style?: typeof style;
  label?: string;
  placeholder?: string;
  type: string;
  id: string;
  autofocus?: boolean;
  required?: boolean;
  value?: string;
  error?: string;
} & TProps;

const defaultValues: Pick<Props, "autofocus" | "required" | "style" | "value" | "error"> = {
  autofocus: false,
  required: false,
  style,
  value: "",
};

export class Input extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  componentDidMount(): any {
    if (this.props.autofocus) {
      const input = this.element?.querySelector("input");
      input?.focus();
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
