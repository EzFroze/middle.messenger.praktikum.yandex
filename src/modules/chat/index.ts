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

type Props = {
  style?: typeof style,
  dots?: string,
  clip?: string,
  sendArrow: ChildType<Button>,
  chatData?: unknown,
  messageInput?: ChildType<Input>,
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

    chatController.sendMessage(text);

    this.children.messageInput.setProps({
      value: ""
    });
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
    }
  },
  $$type: "child"
}, (state) => ({
  ...state.messenger,
  userId: state.settings.id
}));
