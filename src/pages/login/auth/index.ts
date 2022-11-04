import Block, { TProps } from "../../../app/block";
import { Input, Link } from "../../../components";
import { LoginLayout } from "../../../layout";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

type Props = {
  style: typeof style;
  loginInput: Input;
  passwordInput: Input;
  authLink: Block;
  registerLink: Block;
} & TProps;

type TForm = {
  [key: string]: {
    value: string;
    error?: string;
  };
};

class AuthPage extends Block<Props> {
  private form: TForm = {
    login: {
      value: "",
    },
    password: {
      value: "",
    },
  };

  constructor(props: Props) {
    super(props);
  }

  init() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      input.setProps({
        events: {
          change: (event: any) => this.handleChangeInput(event, input),
        },
      });
    });

    this.children.authLink.setProps({
      events: {
        click: () => {
          // eslint-disable-next-line no-console
          console.log(this.form);
        },
      },
    });
  }

  getInputs() {
    return Object.values(this.children)
      .reduce((acc, children) => {
        if (children instanceof Input) {
          acc.push(children);
        }
        return acc;
      }, [] as Input[]);
  }

  handleChangeInput(event: Event, input: Input) {
    const { value } = event.target as HTMLInputElement;

    this.form[input.props.id].value = value;

    input.setProps({
      value,
      error: value
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const authInstance = new AuthPage({
  style,
  loginInput: new Input({
    label: "Логин",
    type: "text",
    id: "login",
    autofocus: true,
    required: true,
  }),
  passwordInput: new Input({
    label: "Пароль",
    type: "password",
    id: "password",
    autofocus: false,
    required: true,
  }),
  authLink: new Link({
    text: "Войти",
    className: style.authBtn,
    to: "/messenger",
  }),
  registerLink: new Link({
    text: "Зарегистрироваться",
    to: "/login/register",
    className: style.register,
  }),
});

export const authPage = LoginLayout.bind(null, { content: authInstance }) as typeof Block;
