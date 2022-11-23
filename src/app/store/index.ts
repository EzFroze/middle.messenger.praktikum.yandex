import { EventBus } from "../event-bus";
import { Indexed, StoreEvents, StoreState } from "./typings";

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const keys = Object.keys(rhs);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    try {
      if (typeof rhs[key] === "object") {
        // eslint-disable-next-line no-param-reassign
        lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
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

function set(
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

class Store extends EventBus {
  private state: StoreState = {
    login: {},
    settings: {
      id: 0,
      first_name: "",
      second_name: "",
      email: "",
      phone: "",
      display_name: "",
      login: "",
      avatar: ""
    },
    messenger: {
      chatsList: []
    }
  };

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();

// TODO удалить после добавлеия
// @ts-ignore
window.store = () => store.getState();
