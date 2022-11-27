import { BaseAPI } from "../../app/http";
import {
  CreateChatRequestType,
  DeleteChatRequestType,
  EditUsersInChatRequestType,
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

  usersPut(data: EditUsersInChatRequestType) {
    return this.http.put("/users", { data });
  }

  usersDelete(data: EditUsersInChatRequestType) {
    return this.http.delete("/users", { data });
  }

  update = undefined;
}

export default new ChatAPI();
