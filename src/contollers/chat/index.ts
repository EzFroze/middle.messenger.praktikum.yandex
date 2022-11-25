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

  token?: string;

  interval?: NodeJS.Timer;

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

      store.set("messenger", { selectedChatId: id });

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
          store.set("messenger", { chatToken: token });
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
    this.token = token;

    if (!userId || !chatId || !token) return;

    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }

  handleOpenSocket() {
    store.set("messenger", { chat: undefined });

    this.socket?.send(JSON.stringify({
      content: "0",
      type: "get old",
    }));

    this.pingPongSocket();
  }

  handleCloseSocket(event: WebSocketEventMap["close"]) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }
  }

  pingPongSocket() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    const ping = {
      type: "ping"
    };

    this.interval = setInterval(() => {
      this.socket?.send(JSON.stringify(ping));
    }, 10_000);
  }

  handleMessageSocket(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (data.type === "pong") return;

    const state = store.getState();

    if (data.type === "message" && state.messenger.chat) {
      this.handleOpenSocket();
    }

    if (Array.isArray(data)) {
      store.set("messenger", { chat: [...data] });
    }
  }

  chatConnect() {
    const state = store.getState();
    if (this.token === state.messenger.chatToken) {
      return;
    }

    this.createSocket();

    this.socket?.addEventListener("open", this.handleOpenSocket.bind(this));

    this.socket?.addEventListener("close", this.handleCloseSocket.bind(this));

    this.socket?.addEventListener("message", this.handleMessageSocket.bind(this));

    this.socket?.addEventListener("error", (event: ErrorEvent) => {
      console.error("Ошибка", event.message);
    });
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({
      content: message,
      type: "message"
    }));

    this.pingPongSocket();
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
