import { v4 as makeUUID } from "uuid";
import { EventBus } from "./event-bus";

type TMeta = {
  tagName: string,
  props: TProps,
};

type BlockEvents = Record<string, (event: any) => void>;

export type TProps = {
  children?: Block<{}>,
  events?: BlockEvents,
  _id?: string
};

class Block<P extends object> {
  static EVENTS = {
    INIT: "init",
    FLOW_CMD: "flow:component-did-mount",
    FLOW_CMU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: null | HTMLElement;

  _meta: TMeta | null;

  tagName: string | "div";

  props: P & TProps;

  _id: null | string;

  children: null | Record<string, Block<{}>>;

  _eventBus: () => EventBus;

  /**
   * @param tagName {string} - Тег который нужно создать
   * @param props {object} - Пропсы
   *
   * @returns {void}
   */
  constructor(tagName = "div", propsAndChildren: P & TProps) {
    const eventBus = new EventBus();

    const props = propsAndChildren;

    this._meta = {
      tagName,
      props
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id } as TProps & P);

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CMU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    if (!this._meta) return;
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(): any {
    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CMD);
  }

  _componentDidUpdate(oldProps: {}, newProps: {}): void {
    this.componentDidUpdate(oldProps, newProps);
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: {}, newProps: {}): void {
    console.log(oldProps, newProps);
  }

  setProps = (nextProps: {}) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    if (!this._element) return;

    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();
  }

  render(): any {
    console.log("mounted");
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P & TProps) {
    const update = (oldProps: {}, newProps: {}) => {
      this._eventBus().emit(Block.EVENTS.FLOW_CMU, oldProps, newProps);
    };

    return new Proxy(props, {
      set(target: typeof props, key: string, value: any) {
        const oldProps = { ...target };
        // @ts-ignore
        target[key] = value;
        update(oldProps, target);
        return true;
      }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  show() {
    const element = this.getContent();
    if (element) {
      element.style.display = "block";
    }
  }

  hide() {
    const element = this.getContent();
    if (element) {
      element.style.display = "none";
    }
  }
}

export default Block;
