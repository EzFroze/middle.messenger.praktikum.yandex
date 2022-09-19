import Block, { TProps } from "../../app/block";
import { PropsWithRouter, withRouter } from "../../hocs/with-router";
import template from "./index.hbs";

type BaseTypes = PropsWithRouter & TProps;

interface Props extends BaseTypes {
  to: string;
  text: string;
  className?: string;
}

class LinkBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event) => {
          this.onClick(event);
        },
      },
    });
  }

  navigate() {
    this.props.router?.go(this.props.to);
  }

  onClick(event: Event, cb?: (event: Event) => false | undefined) {
    if (cb) {
      const result = cb(event);
      if (!result) {
        return;
      }
    }

    event.preventDefault();
    this.navigate();
  }

  setProps(nextProps: Partial<Props>) {
    if (!nextProps) {
      return;
    }

    const events = { ...nextProps.events };

    if (events?.click) {
      nextProps.events = {
        ...events,
        click: (event) => {
          this.onClick.call(this, event, events.click);
        },
      };
    }

    Object.assign(this.props, nextProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter<Props>(LinkBase);
