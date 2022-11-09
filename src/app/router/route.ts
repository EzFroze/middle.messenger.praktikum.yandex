import Block from "../block";
import { ChildType } from "../block/typings";

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  const fragment = block.render();
  root?.replaceChildren(fragment);
  block.dispatchComponentDidMount();
}

export class Route {
  private _pathname: string;

  private readonly _blockClass: ChildType;

  private _block: Block | null;

  private readonly _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: ChildType,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentDidUnmount();
      this._block = null;
    }
  }

  get pathname() {
    return this._pathname;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      const {
        block: BlockClass,
        props
      } = this._blockClass;
      this._block = new BlockClass(props);

      render(this._props.rootQuery, this._block);
      return;
    }
  }
}
