import { v4 as makeUUID } from "uuid";
import { EventBus } from "./event-bus";

type TMeta = {
  props: TProps,
};

export type TProps = {
  events?: Record<string, (event: any) => void>,
};

class Block<P = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CMD: "flow:component-did-mount",
    FLOW_CMU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _element: HTMLElement;

  private _meta: TMeta;

  private _id: string;

  public tagName: string;

  public props: P & TProps;

  children: Record<string, Block>;

  private _eventBus: () => EventBus;

  /**
   * @param tagName {string} - Тег который нужно создать
   * @param propsAndChildren {object} - Пропсы
   *
   * @returns {void}
   */
  constructor(propsAndChildren: P & TProps) {
    const { props, children } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();

    this._meta = {
      props
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id } as TProps & P & { _id: string });

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CMU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): any {
    return true;
  }

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CMD);
  }

  private _componentDidUpdate(oldProps: {}, newProps: {}): void {
    this.componentDidUpdate(oldProps, newProps);
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: {}, newProps: {}): void {
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    const newElement = fragment.firstElementChild;

    if (!newElement) return;

    this._element?.replaceWith(newElement);

    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: P & TProps) {
    const update = (oldProps: {}, newProps: {}) => {
      this._eventBus().emit(Block.EVENTS.FLOW_CMU, oldProps, newProps);
    };

    return new Proxy(props, {
      get(target, key) {
        // @ts-ignore
        const value = target[key];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, key, value) {
        const oldProps = { ...target };
        // @ts-ignore
        target[key] = value;
        update(oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _getChildren(propsAndChildren: {}) {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(
    template: (props: Record<string, any>) => string,
    props: Record<string, any>
  ): DocumentFragment {
    if (!this.children) return new DocumentFragment();
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (!stub) return;

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
