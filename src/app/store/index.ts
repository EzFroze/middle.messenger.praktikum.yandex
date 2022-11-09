import { EventBus } from "../event-bus";

type Indexed<T = unknown> = Record<string, T>;

type StoreState = {
  login: Indexed,
  profile: Indexed,
  messenger: Indexed
};

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

export enum StoreEvents {
  Updated = "updated"
}

class StoreBase extends EventBus {
  private state: StoreState = {
    login: {},
    profile: {},
    messenger: {}
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const Store = new StoreBase();