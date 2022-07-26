import Block, { TProps } from "../../app/block";
import template from "./index.hbs";

type Props = {
  text: string,
  className?: string,
} & TProps;

export class Button extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
