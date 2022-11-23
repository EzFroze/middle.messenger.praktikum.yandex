import { GetChatsResponseType } from "../../api/chat-api/typings";

export type Indexed<T = unknown> = Record<string, T>;

export type StoreState = {
  login: Indexed,
  settings: {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string | null,
    login: string,
    avatar: string,
    email: string,
    phone: string
  },
  messenger: {
    chatsList: GetChatsResponseType
  }
};

export enum StoreEvents {
  Updated = "updated"
}
