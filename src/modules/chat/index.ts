import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { clip, dots, sendArrow } from "../../../static/images";
import Block from "../../app/block";
import { Input } from "../../components";
import { ChildType } from "../../app/block/typings";
import { StoreState } from "../../app/store/typings";
import { connect } from "../../app/store/helpers";
import { authController, chatController } from "../../contollers";

type Props = {
  style?: typeof style,
  dots?: string,
  clip?: string,
  sendArrow?: string,
  chatData?: unknown,
  messageInput?: ChildType<Input>,
  state?: StoreState["messenger"]
};

const defaultValues: Pick<Props, "dots" | "clip" | "sendArrow" | "style"> = {
  style,
  sendArrow,
  dots,
  clip,
};

export class Chat extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  async init() {
    await authController.getUser();
  }

  componentDidUpdate() {
    chatController.chatConnect();
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
    }
  },
  $$type: "child"
}, (state) => state.messenger);
