import Block, { TProps } from "../../utils/block";
import template from "./index.hbs";

type Props = {
  text: string,
  className: string,
  type: "button" | "link",
  link?: string
} & TProps;

export class Button extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
