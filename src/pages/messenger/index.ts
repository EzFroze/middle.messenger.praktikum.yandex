import template from "./index.hbs";
import { MessengerLayout } from "../../layout";
import { Chat, ChatList } from "../../modules";
import { chatList as chatListMock } from "./mock";
import Block from "../../app/block";
import { Input } from "../../components";
import * as style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";

type Props = {
  chatList: ChildType<ChatList>,
  chat: ChildType<Chat>,
  style?: typeof style
};

class MessengerPage extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const pageProps: Props = {
  chatList: {
    block: ChatList,
    props: { chats: chatListMock },
    $$type: "child"
  },
  chat: {
    block: Chat,
    props: {
      messageInput: {
        block: Input,
        props: {
          placeholder: "Сообщение",
          type: "text",
          id: "message",
        },
        $$type: "child"
      }
    },
    $$type: "child"
  },
  style
};

export const messengerPage: ChildType<MessengerLayout> = {
  block: MessengerLayout,
  props: {
    content: {
      block: MessengerPage,
      props: pageProps,
      $$type: "child"
    }
  },
  $$type: "child"
};
