import template from "./index.hbs";

import { MessengerLayout } from "../../layout/exports";
import { Chat, ChatList } from "../../modules/exports";
import { chatList as chatListMock } from "./mock";
import Block from "../../app/block";
import { Input } from "../../components/input";

type Props = {
  content: Block
};

class MessengerPage extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const chatListResult = new ChatList({ chats: chatListMock });
const chatResult = new Chat({ messageInput: new Input({ placeholder: "Сообщение", type: "text", id: "message", style: {} }) });

const layout = new MessengerLayout({ chatList: chatListResult, chat: chatResult });

export const messengerPage = MessengerPage.bind(null, { content: layout });
