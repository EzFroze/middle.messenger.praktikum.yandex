import { BaseAPI } from "../../app/http";
import {
  AddUsersInChatRequestType,
  CreateChatRequestType,
  DeleteChatRequestType,
  GetGhatsTokenRequestType
} from "./typings";

export class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  request(): Promise<XMLHttpRequest> {
    return this.http.get("/");
  }

  create(data: CreateChatRequestType): Promise<XMLHttpRequest> {
    return this.http.post("/", { data });
  }

  delete(data: DeleteChatRequestType): Promise<XMLHttpRequest> {
    return this.http.delete("/", { data });
  }

  token(data: GetGhatsTokenRequestType) {
    return this.http.post(`/token/${data.id}`);
  }

  users(data: AddUsersInChatRequestType) {
    return this.http.put("/users", { data });
  }

  update = undefined;
}

export default new ChatAPI();
