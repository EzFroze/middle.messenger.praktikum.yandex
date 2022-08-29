import { EventBus } from "./event-bus";

type TMeta = {
  tagName: string,
  props: object
};

type TProps = {
  children?: typeof Block
} & Record<string, any> | {};

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CMD: "flow:component-did-mount",
    FLOW_CMU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: null | HTMLElement;

  _meta: TMeta | null;

  tagName: string | "div";

  props: TProps;

  _eventBus: () => EventBus;

  /**
   * @param tagName {string} - Тег который нужно создать
   * @param props {object} - Пропсы
   *
   * @returns {void}
   */
  constructor(tagName = "div", props: TProps) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props
    };

    this.props = props;

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
    this.props = this._makePropsProxy(this.props);
    this.componentDidMount();
  }

  componentDidMount(): any {
    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CMD);
  }

  _componentDidUpdate(oldProps: {}, newProps: {}) {
    console.log(oldProps, newProps);
    this.componentDidUpdate();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(): any {
    return true;
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

    this._element.innerHTML = block;
  }

  render(): any {
    console.log("mounted");
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy<T extends TProps>(props: T) {
    const update = (oldProps: {}, newProps: {}) => {
      this._eventBus().emit(Block.EVENTS.FLOW_CMU, oldProps, newProps);
    };

    return new Proxy(props, {
      set(target: Record<string, any>, key: string, value: any) {
        const oldProps = { ...target };
        target[key] = value;
        update(oldProps, target);
        return true;
      }
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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
