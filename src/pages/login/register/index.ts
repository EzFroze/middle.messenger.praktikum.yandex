import Block, { TProps } from "../../../app/block";
import { Button, Input, Link } from "../../../components";
import { patterns } from "../../../const/regexp";
import { LoginLayout } from "../../../layout";
import { TForm, validate } from "../../../utils/validate";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { ChildType } from "../../../app/block/typings";
import { RegisterPostRequest } from "../../../api/login-api/typings";
import { authController } from "../../../contollers";
import { Routes } from "../../../app/routes/typings";

type Props = {
  style: typeof style;
  mailInput: ChildType<Input>;
  loginInput: ChildType<Input>;
  nameInput: ChildType<Input>;
  phoneInput: ChildType<Input>;
  surnameInput: ChildType<Input>;
  passwordInput: ChildType<Input>;
  passwordRetryInput: ChildType<Input>;
  registerBtn: ChildType<Button>;
  authBtn: ChildType<Link>;
} & TProps;

export class RegisterPage extends Block<Props> {
  private form: TForm = {
    email: {
      value: "",
      validate: {
        regexp: {
          pattern: patterns.EMAIL,
          errorMessage: "Проверьте правильность введенной почты",
        },
        minLength: {
          length: 4
        },
      },
    },
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
          errorMessage: "Логин",
        },
      },
    },
    first_name: {
      value: "",
      validate: {
        regexp: {
          pattern: patterns.NAME,
          errorMessage:
            "Имя может на латинице или кирилице. Первая буква заглавная",
        },
      },
    },
    second_name: {
      value: "",
      validate: {
        regexp: {
          pattern: patterns.NAME,
          errorMessage:
            "Фамилия может на латинице или кирилице. Первая буква заглавная",
        },
      },
    },
    phone: {
      value: "",
      validate: {
        regexp: {
          pattern: patterns.PHONE,
          errorMessage: "Введите корректный номер телефона",
        },
        minLength: {
          length: 10
        },
        maxLength: {
          length: 15
        },
      },
    },
    password: {
      value: "",
      validate: {
        minLength: {
          length: 8
        },
        maxLength: {
          length: 40
        },
        regexp: {
          pattern: patterns.PASSWORD,
          errorMessage: "Минимум 8 букв и одна заглавная",
        },
      },
    },
    password_retry: {
      value: "",
      validate: {
        minLength: {
          length: 8
        },
        maxLength: {
          length: 40
        },
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
            this.handleChangeBlur(event, input);
          },
        },
      });
    });

    this.children.registerBtn.setProps({
      events: { click: this.handleClick.bind(this) },
    });
  }

  handleChangeBlur(event: Event, input: Input) {
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

  handleClick() {
    let hasError = false;
    const inputs = this.getInputs();

    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];

      const form = this.form[input.props.id];
      const { error } = validate(form.value, form.validate);

      if (error) {
        form.error = error;
        hasError = true;
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
      .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    }, {}) as RegisterPostRequest;

    authController.signup(data);
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

  render() {
    return this.compile(template, this.props);
  }
}

const registerProps: Props = {
  style,
  mailInput: {
    block: Input,
    props: {
      label: "Почта",
      type: "text",
      id: "email",
      autofocus: true,
      required: true,
    },
    $$type: "child"
  },
  loginInput: {
    block: Input,
    props: {
      label: "Логин",
      type: "text",
      id: "login",
      required: true,
    },
    $$type: "child"
  },
  nameInput: {
    block: Input,
    props: {
      label: "Имя",
      type: "text",
      id: "first_name",
      required: true,
    },
    $$type: "child"
  },
  surnameInput: {
    block: Input,
    props: {
      label: "Фамилия",
      type: "text",
      id: "second_name",
      required: true,
    },
    $$type: "child"
  },
  phoneInput: {
    block: Input,
    props: {
      label: "Телефон",
      type: "text",
      id: "phone",
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
      required: true,
    },
    $$type: "child"
  },
  passwordRetryInput: {
    block: Input,
    props: {
      label: "Пароль (ещё раз)",
      type: "password",
      id: "password_retry",
      required: true,
    },
    $$type: "child"
  },
  registerBtn: {
    block: Button,
    props: {
      text: "Создать профиль",
      className: style.register,
    },
    $$type: "child"
  },
  authBtn: {
    block: Link,
    props: {
      to: Routes.AUTH_PAGE,
      text: "Войти",
      className: style.authBtn,
    },
    $$type: "child"
  },
};

export const registerPage: ChildType<LoginLayout> = {
  block: LoginLayout,
  props: {
    content: {
      block: RegisterPage,
      props: registerProps,
      $$type: "child"
    },
  },
  $$type: "child"
};
