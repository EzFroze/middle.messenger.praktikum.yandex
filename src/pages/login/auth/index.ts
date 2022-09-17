import style from "./styles.module.pcss";
import template from "./index.hbs";
import { LoginLayout } from "../../../layout/exports";
import { Input } from "../../../components/exports";
import Block, { TProps } from "../../../app/block";
import { Button } from "../../../components/button";

type Props = {
  style: typeof style,
  loginInput: Input,
  passwordInput: Input,
  authBtn: Button
} & TProps;

type TForm = {
  [key: string]: {
    value: string,
    error?: string
  }
};

class AuthPage extends Block<Props> {
  private form: TForm = {
    login: {
      value: ""
    },
    password: {
      value: ""
    }
  };

  constructor(props: Props) {
    super(props);
  }

  init() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      input.setProps(
        { events: { change: (event: any) => this.handleChangeInput(event, input) } }
      );
    });

    this.children.authBtn.setProps({ events: { click: () => { console.log(this.form); } } });
  }

  getInputs() {
    return Object.values(this.children).reduce((acc, children) => {
      if (children instanceof Input) {
        acc.push(children);
      }
      return acc;
    }, [] as Input[]);
  }

  handleChangeInput(event: Event, input: Input) {
    const { value } = event.target as HTMLInputElement;

    this.form[input.props.id].value = value;

    input.setProps({ value, error: value });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const authInstance = new AuthPage({
  style,
  loginInput: new Input({ label: "Логин", type: "text", id: "login", autofocus: true, required: true }),
  passwordInput: new Input({ label: "Пароль", type: "password", id: "password", autofocus: false, required: true }),
  authBtn: new Button({ text: "Войти", className: style.authBtn, type: "link", link: "/messenger" })
});

export const authPage = new LoginLayout({ content: authInstance });
