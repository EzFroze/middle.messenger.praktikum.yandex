import { EventBus } from "../event-bus";
import { Indexed, StoreEvents, StoreState } from "./typings";

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

  Object.assign(state, result);
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
      avatar: null
    },
    messenger: {}
  };

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => {
      console.log(this.state);
    });
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
