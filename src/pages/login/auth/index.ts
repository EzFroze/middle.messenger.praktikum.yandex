import style from "./styles.module.pcss";
import template from "./index.hbs";
import { LoginLayout } from "../../../layout/exports";
import { Input } from "../../../components/exports";
import Block, { TProps } from "../../../utils/block";
import { Button } from "../../../components/button";

type Props = {
  style: typeof style,
  loginInput: Input,
  passwordInput: Input,
  authBtn: Button
} & TProps;

class AuthPage extends Block<Props> {
  private form: Record<string, string> = {
    login: "",
    password: ""
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

  handleChangeInput(event: any, input: Input) {
    const { value } = event.target;

    this.form[input.props.id] = value;

    input.setProps({ value });
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
