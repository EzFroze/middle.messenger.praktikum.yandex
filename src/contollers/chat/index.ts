import { createNotification } from "../../utils/create-notification";
import { chatAPI } from "../../api";
import {
  AddUsersInChatRequestType,
  CreateChatRequestType,
  DeleteChatRequestType
} from "../../api/chat-api/typings";
import { store } from "../../app/store";

export class ChatController {
  socket?: WebSocket;

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

  async setSelectedChat(event: Event) {
    const target = event.target as HTMLElement;
    const id = Number(target.getAttribute("data-chat-id"));
    if (id) {
      const state = store.getState();
      if (state.messenger.selectedChatId === id) return;

      store.set("messenger.selectedChatId", id);

      await this.setChatToken();
    }
  }

  async setChatToken() {
    try {
      const state = store.getState();
      if (state.messenger.selectedChatId) {
        const result = await chatAPI.token({ id: state.messenger.selectedChatId });

        const {
          response: { token },
          status
        } = result;

        if (status === 200) {
          store.set("messenger.chatToken", token);
        }
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }

  createSocket() {
    const state = store.getState();
    const userId = state.settings.id;
    const chatId = state.messenger.selectedChatId;
    const token = state.messenger.chatToken;

    if (!userId || !chatId || !token) return;

    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    // this.socket?.send(JSON.stringify({
    //   content: "0",
    //   type: "get old",
    // }));

    setInterval(() => {
      this.socket?.send(JSON.stringify({
        type: "ping"
      }));
    }, 10_000);
  }

  chatConnect() {
    this.createSocket();

    this.socket?.addEventListener("open", () => {
      console.log("Соединение установлено");
    });

    this.socket?.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket?.addEventListener("message", (event) => {
      console.log("Получены данные", event.data);
    });

    this.socket?.addEventListener("error", (event: ErrorEvent) => {
      console.log("Ошибка", event.message);
    });
  }

  async addUsersToChat(data: AddUsersInChatRequestType) {
    try {
      const result = await chatAPI.users(data);

      const { status } = result;

      if (status === 200) {
        createNotification({
          text: "Пользователи добавлены",
          type: "success"
        });
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }
}

export default new ChatController();
