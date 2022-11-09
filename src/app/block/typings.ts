import Block from ".";

interface ChildConstructor<B = Block> {
  new(props: unknown): B
}

export type ChildType<B extends Block = Block, P = B["props"]> = {
  block: ChildConstructor<B>,
  props: P,
  $$type: "child"
};

export type ChildsRecord<B extends Block = Block> = Record<string, ChildType<B>>;
