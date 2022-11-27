import Block, { TProps } from "../../app/block";

import template from "./index.hbs";
import { router } from "../../app/router";
import { Routes } from "../../app/routes/typings";

interface Props extends TProps {
  to: Routes;
  text: string;
  className?: string;
}

export class Link extends Block<Props> {
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
    router.go(this.props.to);
  }

  render() {
    return this.compile(template, this.props);
  }
}
