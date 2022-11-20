import Block, { TProps } from "../../app/block";
import { ChildsRecord } from "../../app/block/typings";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  content: ChildsRecord,
  style?: typeof style,
  contentClass?: string
} & TProps;

const defaultProps: Pick<Props, "style" | "contentClass"> = {
  style,
  contentClass: ""
};

export class Modal extends Block<Props> {
  constructor(props: Props) {
    const childs = props.content;
    super({
      ...defaultProps,
      ...props,
      ...childs,
      content: {}
    });
  }

  init() {
    this.setProps({ events: { click: this.handleCLickClose.bind(this) } });
  }

  handleCLickClose(event: Event) {
    const target = event.target as HTMLSpanElement | HTMLDivElement;

    if (target.id === "close" || target.id === "backdrop") {
      this.dispatchComponentDidUnmount();
    }
  }

  render() {
    // Для рендера многих виджетов
    // типо react fragment на минималках
    const childs = Object.values(this.children)
      .map((child) => {
        return `<div data-id="${child.id}"></div>`;
      });

    return this.compile(template, {
      ...this.props,
      childs
    });
  }
}
