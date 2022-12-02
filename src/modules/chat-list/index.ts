import template from "./index.hbs";
import style from "./styles.module.pcss";

import arrow from "../../../static/images/arrow.svg";
import Block from "../../app/block";
import { Button, Input, Link } from "../../components";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";
import { connect } from "../../app/store/helpers";
import { chatController } from "../../contollers";
import { createModal } from "../../utils/create-modal";

type Props = {
  style?: typeof style;
  profileLink?: ChildType<Link>;
  createChatButton?: ChildType<Button>
};

const defaultValues: Pick<Props, "style" | "profileLink" | "createChatButton"> = {
  style,
  profileLink: {
    block: Link,
    props: {
      to: Routes.SETTINGS_PAGE,
      text: `Профиль <img src="${arrow}" alt="arrow">`,
      className: style.profile,
    },
    $$type: "child"
  },
  createChatButton: {
    block: Button,
    props: {
      text: "Создать чат",
      className: style.createChatBtn
    },
    $$type: "child"
  }
};

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  init() {
    chatController.getChats();

    this.children.createChatButton.setProps({
      events: {
        click: this.handleClickCreateChatButton.bind(this)
      }
    });

    this.setProps({
      events: {
        click: this.handleClickChat.bind(this)
      }
    });
  }

  handleClickCreateChatButton() {
    let inputValue = "";

    const closeModal = createModal({
      input: {
        block: Input,
        props: {
          id: "title",
          type: "text",
          required: true,
          autofocus: true,
          label: "Название чата",
          events: {
            focusout: (event: Event) => {
              const { value } = event.target as HTMLInputElement;
              inputValue = value;
            }
          }
        },
        $$type: "child"
      },
      button: {
        block: Button,
        props: {
          text: "Создать",
          className: style.createChatBtn,
          events: {
            click: async () => {
              await chatController.createChat({
                title: inputValue
              });

              closeModal();
            }
          }
        },
        $$type: "child"
      }
    }, style.modal);
  }

  async handleClickChat(event: Event) {
    await chatController.setSelectedChat(event);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const chatList: ChildType<ChatList> = connect({
  block: ChatList,
  props: {},
  $$type: "child"
}, (state) => ({
  chatsList: { ...state.messenger.chatsList },
  selectedChatId: state.messenger.selectedChatId
}));
