import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import { LoginLayout } from "../../../layout/exports";
import { Input } from "../../../components/exports";
import Block, { TProps } from "../../../utils/block";

type Props = {
  style: typeof style,
  mailInput: Input,
  loginInput: Input,
  nameInput: Input,
  phoneInput: Input,
  surnameInput: Input,
  passwordInput: Input,
  passwordRetryInput: Input,
} & TProps;

export class RegisterPage extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const registerInstance = new RegisterPage({
  style,
  mailInput: new Input({ label: "Почта", type: "text", id: "email", autofocus: true, reqiured: true }),
  loginInput: new Input({ label: "Логин", type: "text", id: "login", reqiured: true }),
  nameInput: new Input({ label: "Имя", type: "text", id: "first_name", reqiured: true }),
  surnameInput: new Input({ label: "Фамилия", type: "text", id: "second_name", reqiured: true }),
  phoneInput: new Input({ label: "Телефон", type: "text", id: "phone", reqiured: true }),
  passwordInput: new Input({ label: "Пароль", type: "password", id: "password", reqiured: true }),
  passwordRetryInput: new Input({ label: "Пароль (ещё раз)", type: "password", id: "password", reqiured: true }),
});

export const registerPage = new LoginLayout({ content: registerInstance });
