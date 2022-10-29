import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { clip, dots, sendArrow } from "../../../static/images";
import Block from "../../app/block";
import { Input } from "../../components";
import { TForm, validate } from "../../utils/validate";

type Props = {
  style?: typeof style,
  dots?: string,
  clip?: string,
  sendArrow?: string,
  chatData?: unknown,
  messageInput: Input
};

const defaultValues: Pick<Props, "dots" | "clip" | "sendArrow" | "style"> = {
  style,
  sendArrow,
  dots,
  clip,
};

export class Chat extends Block<Props> {
  private form: TForm = {
    message: {
      validate: {
        minLength: 1
      },
      value: ""
    }
  };

  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  init() {
    this.children.messageInput.setProps(
      {
        style: {
          formControl: style.input,
          error: style.error
        },
        events: {
          change: (event: Event) => this.handleChangeMessage(event, this.children.messageInput)
        }
      }
    );
  }

  handleChangeMessage(event: Event, input: Block) {
    const { value } = event.target as HTMLInputElement;

    const form = this.form.message;

    const { error } = validate(value, form.validate);

    form.value = value;
    form.error = error;

    input.setProps({
      value,
      error
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
