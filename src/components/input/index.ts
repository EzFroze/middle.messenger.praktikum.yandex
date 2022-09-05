import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import Block from "../../utils/block";

type Props = {
  style?: typeof style,
  label: string,
  type: string,
  id: string,
  autofocus?: boolean,
  reqiured?: boolean
};

const defaultValues: Pick<Props, "autofocus" | "reqiured" | "style"> = {
  autofocus: false,
  reqiured: false,
  style
};

export class Input extends Block<Props> {
  constructor(props: Props) {
    super("div", { ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const input = (
  label = "",
  type = "text",
  id = "",
  autofocus = false,
  required = false
) => {
  return template({ style, label, type, id, autofocus, required });
};
