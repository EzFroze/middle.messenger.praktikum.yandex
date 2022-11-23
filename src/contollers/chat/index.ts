import { createNotification } from "../../utils/create-notification";
import { chatAPI } from "../../api";
import { CreateChatRequestType, DeleteChatRequestType } from "../../api/chat-api/typings";
import { store } from "../../app/store";

export class ChatController {
  async getChats() {
    try {
      const result = await chatAPI.request();

      const {
        status,
        response
      } = result;

      if (status === 200) {
        store.set("messenger.chatsList", [...response]);
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }

  async createChat(data: CreateChatRequestType) {
    try {
      await chatAPI.create(data);

      await this.getChats();

      createNotification({
        text: `Чат "${data.title}" создан`,
        type: "success"
      });
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }

  async deleteChat(data: DeleteChatRequestType) {
    try {
      const result = await chatAPI.delete(data);

      console.log(result);
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }
}

export default new ChatController();
