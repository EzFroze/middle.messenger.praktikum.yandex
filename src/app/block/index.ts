import { v4 as makeUUID } from "uuid";
import { EventBus } from "../event-bus";
import { isEqual } from "../../utils/is-equal";
import { deepClone } from "../../utils/deep-clone";

export type TProps = {
  events?: Record<string, (event: any) => void>;
};

class Block<P extends Record<string | number | symbol, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CDUM: "flow:component-did-unmount",
    FLOW_RENDER: "flow:render",
  };

  private _element?: HTMLElement;

  private readonly _id: string;

  public props: P & TProps;

  children: Record<string, Block>;

  private _eventBus: () => EventBus;

  /**
   * @param propsAndChildren {object} - Пропсы
   *
   * @returns {void}
   */
  constructor(propsAndChildren: P & TProps) {
    const {
      props,
      children
    } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();

    this._id = makeUUID();

    this.props = this._makePropsProxy({
      ...props,
      _id: this._id
    } as TProps &
    P & { _id: string });

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDUM, this._componentDidUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this._eventBus()
      .emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children)
      .forEach((child) => {
        child.dispatchComponentDidMount();
      });
  }

  protected componentDidMount(): void {
  }

  public dispatchComponentDidMount() {
    this._eventBus()
      .emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: P & TProps,
    newProps: P & TProps
  ): void {
    this.componentDidUpdate(oldProps, newProps);
    this._eventBus()
      .emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    oldProps: P & TProps,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    newProps: P & TProps
  ): void {
  }

  protected componentDidUnmount() {

  }

  private _componentDidUnmount() {
    this.componentDidUnmount();

    if (this.children) {
      Object.values(this.children)
        .forEach((child) => {
          child.dispatchComponentDidUnmount();
        });
    }

    this._removeEvents();
    this._element?.remove();
  }

  public dispatchComponentDidUnmount() {
    this._eventBus()
      .emit(Block.EVENTS.FLOW_CDUM);
  }

  setProps(nextProps: Partial<P & TProps>) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

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

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: P & TProps) {
    const update = (oldProps: {}, newProps: {}) => {
      if (!isEqual(oldProps, newProps)) {
        this._eventBus()
          .emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
      }
    };

    return new Proxy(props, {
      get(target, key) {
        // @ts-ignore
        const value = target[key];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, key, value) {
        const oldProps = deepClone(target);
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        target[key] = value;

        update(oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _addEvents() {
    if (!this._element) return;

    const { events = {} } = this.props;

    Object.keys(events)
      .forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
  }

  private _removeEvents() {
    if (!this._element) return;
    const { events = {} } = this.props;

    Object.keys(events)
      .forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
      });
  }

  private _getChildren(propsAndChildren: P & TProps) {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren)
      .forEach(([key, value]) => {
        if (value?.$$type === "child") {
          const {
            props: childProps,
            block: ChildBlock
          } = value;
          children[key] = new ChildBlock(childProps);
        } else {
          props[key] = value;
        }
      });

    return {
      children,
      props
    };
  }

  compile(
    template: (props: Record<string, any>) => string,
    props: Record<string, any>
  ): DocumentFragment {
    if (!this.children) return new DocumentFragment();
    const propsAndStubs = { ...props };

    Object.entries(this.children)
      .forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children)
      .forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

        if (!stub) return;

        stub.replaceWith(child.getContent()!);
      });

    return fragment.content;
  }
}

export default Block;
