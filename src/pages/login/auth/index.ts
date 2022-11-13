import Block, { TProps } from "../../../app/block";
import { Button, Input, Link } from "../../../components";
import { LoginLayout } from "../../../layout";
import { TForm, validate } from "../../../utils/validate";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { patterns } from "../../../const/regexp";
import { ChildType } from "../../../app/block/typings";
import { authController } from "../../../contollers";
import { AuthPostRequest } from "../../../api/login-api/typings";
import { Routes } from "../../../app/routes/typings";

type Props = {
  style: typeof style;
  loginInput: ChildType<Input>;
  passwordInput: ChildType<Input>;
  authLink: ChildType<Button>;
  registerLink: ChildType<Link>;
} & TProps;

class AuthPage extends Block<Props> {
  private form: TForm = {
    login: {
      value: "",
      validate: {
        minLength: {
          length: 3
        },
        maxLength: {
          length: 20
        },
        regexp: {
          pattern: patterns.LOGIN,
          errorMessage: "Укажите логин",
        },
      },
    },
    password: {
      value: "",
      validate: {
        minLength: {
          length: 1,
          errorMessage: "Введите пароль"
        }
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
        click: this.handleClick.bind(this)
      },
    });
  }

  handleClick() {
    let hasError = false;

    const inputs = this.getInputs();

    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const form = this.form[input.props.id];
      const { error } = validate(form.value, form.validate);

      if (error) {
        hasError = true;
        form.error = error;
      }

      input.setProps({
        value: form.value,
        error: form.error
      });
    }

    if (hasError) {
      return;
    }

    const data = Object.entries(this.form)
      .reduce((acc, [key, value]) => {
        acc[key] = value.value;
        return acc;
      }, {} as Record<string, string>) as AuthPostRequest;

    authController.signin(data);
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
    block: Button,
    props: {
      text: "Войти",
      className: style.authBtn,
    },
    $$type: "child"
  },
  registerLink: {
    block: Link,
    props: {
      text: "Зарегистрироваться",
      to: Routes.REGISTER_PAGE,
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
