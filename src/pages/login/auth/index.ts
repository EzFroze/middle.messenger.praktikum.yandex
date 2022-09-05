import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import { LoginLayout } from "../../../layout/exports";
import { Input } from "../../../components/exports";
import Block, { TProps } from "../../../utils/block";

type Props = {
  style: typeof style,
  loginInput: Input,
  passwordInput: Input
} & TProps;

class AuthPage extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const result = new AuthPage({
  style,
  loginInput: new Input({ label: "Логин", type: "text", id: "login", autofocus: true, reqiured: true }),
  passwordInput: new Input({ label: "Пароль", type: "password", id: "password", autofocus: false, reqiured: true }),
});

export const authPage = new LoginLayout({ content: result });
