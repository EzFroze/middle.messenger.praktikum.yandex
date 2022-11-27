import { ChildType } from "../block/typings";
import Block from "../block";
import { Indexed, StoreEvents, StoreState } from "./typings";
import { store } from "./index";
import { deepClone } from "../../utils/deep-clone";

export function connect<B extends Block = Block>(
  block: ChildType<B>,
  mapToState: (state: StoreState) => any = (state) => state
): ChildType<B> {
  const Component = block.block;

  // @ts-ignore
  class Connect extends Component {
    constructor(props: any) {
      const firstState = mapToState(store.getState());
      super({ state: { ...firstState }, ...props });

      store.on(StoreEvents.Updated, () => {
        const state = mapToState(store.getState());

        this.setProps({ state: { ...state } });
      });
    }
  }

  return {
    ...block,
    // @ts-ignore
    block: Connect
  };
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const keys = Object.keys(rhs);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    try {
      if (typeof rhs[key] === "object") {
        if (Array.isArray(rhs[key])) {
          // eslint-disable-next-line no-param-reassign
          lhs[key] = deepClone(rhs[key]);
        } else {
          // eslint-disable-next-line no-param-reassign
          lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[key] = rhs[key];
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = rhs[key];
    }
  }
  return lhs;
}

export function set(
  state: StoreState,
  path: string,
  value: unknown
): void {
  if (typeof state !== "object") {
    return;
  }

  const splitedPath = path.split(".");
  const lastPath = splitedPath[splitedPath.length - 1];
  const result = splitedPath.reduceRight<Indexed>((acc, key) => {
    if (!acc[key] && key === lastPath) {
      acc[key] = value;
    } else if (!acc[key]) {
      // eslint-disable-next-line no-param-reassign
      acc = { [key]: acc };
    }

    return acc;
  }, {});

  merge(state, result);
}
