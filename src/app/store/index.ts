import { EventBus } from "../event-bus";
import { set } from "./helpers";
import { StoreEvents, StoreState } from "./typings";
import { deepClone } from "../../utils/deep-clone";
import { isEqual } from "../../utils/is-equal";

class Store extends EventBus {
  private state: StoreState = {
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
      chatsList: [],
      selectedChatId: null,
      chat: undefined,
      chatToken: undefined,
    }
  };

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const prevState = deepClone(this.state);
    set(this.state, path, value);

    if (!isEqual(prevState, this.state)) {
      this.emit(StoreEvents.Updated);
    }
  }
}

export const store = new Store();

// TODO удалить после завершения работ
// @ts-ignore
window.store = () => store.getState();
