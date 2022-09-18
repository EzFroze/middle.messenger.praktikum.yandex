import Block from "../app/block";
import { Router } from "../app/router";

export interface PropsWithRouter {
  router?: typeof Router;
}

export function withRouter<Props>(
  Component: typeof Block<Props>
): typeof Block<Props> {
  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}
