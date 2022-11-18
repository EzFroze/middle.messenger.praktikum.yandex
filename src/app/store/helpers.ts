import { ChildType } from "../block/typings";
import Block from "../block";
import { StoreEvents, StoreState } from "./typings";
import { store } from "./index";

export function connect<B extends Block = Block>(
  block: ChildType<B>,
  mapToState: (state: StoreState) => any = (state) => state
): ChildType<B> {
  const Component = block.block;

  // @ts-ignore
  class Connect extends Component {
    constructor(props: any) {
      const prevState = mapToState(store.getState());
      super({ state: prevState, ...props });

      store.on(StoreEvents.Updated, () => {
        const state = mapToState(store.getState());

        this.setProps({ state });
      });
    }
  }

  return {
    ...block,
    // @ts-ignore
    block: Connect
  };
}
