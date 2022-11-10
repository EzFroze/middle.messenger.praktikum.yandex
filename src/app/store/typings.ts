export type Indexed<T = unknown> = Record<string, T>;

export type StoreState = {
  login: Indexed,
  profile: Indexed,
  messenger: Indexed
};

export enum StoreEvents {
  Updated = "updated"
}
