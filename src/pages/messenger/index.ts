import template from "./index.hbs";
import { MessengerLayout } from "../../layout";
import { Chat, ChatList } from "../../modules";
import Block from "../../app/block";
import style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";
import { chatList } from "../../modules/chat-list";
import { chat } from "../../modules/chat";

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
  chatList,
  chat,
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
