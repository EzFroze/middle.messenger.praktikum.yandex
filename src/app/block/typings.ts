import Block from ".";

export interface ChildConstructor<B extends Block = Block,
  P = B["props"]> {
  new(props: P): B
}

export type ChildType<B extends Block = Block, P = B["props"]> = {
  block: ChildConstructor<B, P>,
  props: P,
  $$type: "child"
};

export type ChildsRecord<B extends Block = Block> = Record<string, ChildType<B>>;
