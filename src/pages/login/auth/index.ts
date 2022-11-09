import Block, { TProps } from "../../../app/block";
import { Input, Link } from "../../../components";
import { LoginLayout } from "../../../layout";
import { TForm, validate } from "../../../utils/validate";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { patterns } from "../../../const/regexp";
import { ChildType } from "../../../app/block/typings";

type Props = {
  style: typeof style;
  loginInput: ChildType<Input>;
  passwordInput: ChildType<Input>;
  authLink: ChildType<Link>;
  registerLink: ChildType<Link>;
} & TProps;

class AuthPage extends Block<Props> {
  private form: TForm = {
    login: {
      value: "",
      validate: {
        minLength: 3,
        maxLength: 20,
        regexp: {
          pattern: patterns.LOGIN,
          errorMessage: "Укажите логин",
        },
      },
    },
    password: {
      value: "",
      validate: {
        minLength: 8,
        maxLength: 40,
        regexp: {
          pattern: patterns.PASSWORD,
          errorMessage: "Минимум 8 букв и одна заглавная",
        },
      },
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
          focusout: (event: Event) => {
            this.handleChangeInput(event, input);
          }
        },
      });
    });

    this.children.authLink.setProps({
      events: {
        click: (event: Event) => this.handleClick(event)
      },
    });
  }

  handleClick(event: Event) {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      const form = this.form[input.props.id];
      const { error } = validate(form.value, form.validate);

      if (error) {
        event.preventDefault();
        form.error = error;
      }

      input.setProps({
        value: form.value,
        error: form.error
      });
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

    const form = this.form[input.props.id];

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

const authPageProps: Props = {
  style,
  loginInput: {
    block: Input,
    props: {
      label: "Логин",
      type: "text",
      id: "login",
      autofocus: true,
      required: true,
    },
    $$type: "child"
  },
  passwordInput: {
    block: Input,
    props: {
      label: "Пароль",
      type: "password",
      id: "password",
      autofocus: false,
      required: true,
    },
    $$type: "child"
  },
  authLink: {
    block: Link,
    props: {
      text: "Войти",
      className: style.authBtn,
      to: "/messenger",
    },
    $$type: "child"
  },
  registerLink: {
    block: Link,
    props: {
      text: "Зарегистрироваться",
      to: "/login/register",
      className: style.register,
    },
    $$type: "child"
  }
};

export const authPage: ChildType<LoginLayout> = {
  block: LoginLayout,
  props: {
    content: {
      block: AuthPage,
      props: authPageProps,
      $$type: "child"
    }
  },
  $$type: "child"
};
