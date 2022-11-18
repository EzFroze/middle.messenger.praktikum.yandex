import Block, { TProps } from "../../app/block";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

export type Props = {
  // Заголовок нотификаци
  title?: string,
  // Описание нотификации
  text: string,
  // Тип нотификации
  type: "warning" | "danger" | "success",
  // Количество милисекунд через которое должна закрываться нотификация
  timeout?: number,
  style?: typeof style
} & TProps;

const defaultProps: Pick<Props, "style" | "timeout" | "events"> = {
  style,
  timeout: 3000,
};

export class Notification extends Block {
  constructor(props: Props) {
    super({ ...defaultProps, ...props });
  }

  init() {
    this.setProps({ typeClass: style[this.props.type] });
  }

  componentDidMount() {
    setTimeout(() => {
      this.dispatchComponentDidUnmount();
    }, this.props.timeout);
  }

  render() {
    return this.compile(template, this.props);
  }
}
