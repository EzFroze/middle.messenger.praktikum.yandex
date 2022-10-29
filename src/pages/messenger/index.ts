import template from "./index.hbs";
import { MessengerLayout } from "../../layout";
import { Chat, ChatList } from "../../modules";
import { chatList as chatListMock } from "./mock";
import Block from "../../app/block";
import { Input } from "../../components";
import * as style from "./styles.module.pcss";

type Props = {
  chatList: Block,
  chat: Block,
  style?: typeof style
};

export class MessengerPage extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const chatListResult = new ChatList({ chats: chatListMock });
const chatResult = new Chat({
  messageInput: new Input({
    placeholder: "Сообщение",
    type: "text",
    id: "message",
  })
});

const pageInstance = new MessengerPage({
  chatList: chatListResult,
  chat: chatResult,
  style
});

export const messengerPage = MessengerLayout.bind(null, { content: pageInstance }) as typeof Block;
