import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { clip, dots, sendArrow } from "../../../static/images";
import Block from "../../app/block";
import { Button, Input } from "../../components";
import { ChildType } from "../../app/block/typings";
import { StoreState } from "../../app/store/typings";
import { connect } from "../../app/store/helpers";
import { authController, chatController } from "../../contollers";
import { GetChatResponseType } from "../../api/chat-api/typings";
import { createModal } from "../../utils/create-modal";

type Props = {
  sendArrow: ChildType<Button>,
  messageInput: ChildType<Input>,
  addUserButton: ChildType<Button>,
  removeUserButton: ChildType<Button>,
  style?: typeof style,
  dots?: string,
  clip?: string,
  chatData?: unknown,
  state?: StoreState["messenger"],
  selectedChat?: GetChatResponseType
};

const defaultValues: Pick<Props, "dots" | "clip" | "style"> = {
  style,
  dots,
  clip,
};

export class Chat extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  async init() {
    await authController.getUser();

    this.children.messageInput.setProps({
      events: {
        focusout: this.handleInput.bind(this)
      }
    });

    this.children.sendArrow.setProps({
      events: {
        click: this.handleClickSendMessage.bind(this)
      }
    });

    this.children.addUserButton.setProps({
      events: {
        click: this.handleClickAddRemoveUser.bind(this, "add")
      }
    });

    this.children.removeUserButton.setProps({
      events: {
        click: this.handleClickAddRemoveUser.bind(this, "remove")
      }
    });
  }

  componentDidUpdate() {
    chatController.chatConnect();

    const selectedChat = this.props.state?.chatsList.filter(
      ({ id }) => id === this.props.state?.selectedChatId
    )[0];

    this.setProps({ selectedChat });
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;

    this.children.messageInput.setProps({
      value
    });
  }

  handleClickSendMessage() {
    const text = this.children.messageInput.props.value;

    if (!text) return;

    chatController.sendMessage(text);

    this.children.messageInput.setProps({
      value: ""
    });
  }

  handleClickAddRemoveUser(type: "add" | "remove") {
    let inputValue = "";
    const closeModal = createModal({
      input: {
        block: Input,
        props: {
          id: "user-id",
          required: true,
          autofocus: true,
          label: "Id пользователя",
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
          text: type === "add" ? "Добавить" : "Удалить",
          className: style.button,
          events: {
            click: () => {
              if (type === "add") {
                chatController.addUsersToChat({
                  users: [Number(inputValue)],
                  chatId: this.props.state?.selectedChatId!
                });
              } else {
                chatController.removeUsersToChat({
                  users: [Number(inputValue)],
                  chatId: this.props.state?.selectedChatId!
                });
              }

              closeModal();
            }
          }
        },
        $$type: "child"
      }
    }, style.modal);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const chat: ChildType<Chat> = connect({
  block: Chat,
  props: {
    messageInput: {
      block: Input,
      props: {
        placeholder: "Сообщение",
        type: "text",
        id: "message",
        className: style.input
      },
      $$type: "child"
    },
    sendArrow: {
      block: Button,
      props: {
        text: `<img src='${sendArrow}' alt="send arrow" />`,
        className: style.sendArrow
      },
      $$type: "child"
    },
    addUserButton: {
      block: Button,
      props: {
        text: "Добавить пользователя",
        className: style.tooltipElement
      },
      $$type: "child"
    },
    removeUserButton: {
      block: Button,
      props: {
        text: "Удалить пользователя",
        className: style.tooltipElement
      },
      $$type: "child"
    }
  },
  $$type: "child"
}, (state) => ({
  ...state.messenger,
  userId: state.settings.id
}));
