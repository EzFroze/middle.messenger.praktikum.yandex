import { BaseAPI } from "../../app/http";
import { CreateChatRequestType, DeleteChatRequestType } from "./typings";

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

  update = undefined;
}

export default new ChatAPI();
