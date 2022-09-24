import Block, { TProps } from "../../app/block";
import { routes } from "../../app/routes";
import { PropsWithRouter, withRouter } from "../../hocs/with-router";
import template from "./index.hbs";

type BaseTypes = PropsWithRouter & TProps;

type Routes = keyof typeof routes;

interface Props extends BaseTypes {
  to: Routes;
  text: string;
  className?: string;
}

class LinkBase extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  init() {
    this.setProps({
      events: {
        click: (event) => {
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
