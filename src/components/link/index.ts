import Block from "../../app/block";
import { PropsWithRouter, withRouter } from "../../hocs/with-router";
import template from "./index.hbs";

interface Props extends PropsWithRouter {
  to: string;
  text: string;
  // Ожидается класс link
  style?: Record<string, string>;
}

class LinkBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          this.navigate();
        },
      },
    });
  }

  navigate() {
    this.props.router?.go(this.props.to);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter<Props>(LinkBase);
