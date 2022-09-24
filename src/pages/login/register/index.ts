import Block, { TProps } from "../../../app/block";
import { Input, Link } from "../../../components/exports";
import { patterns } from "../../../const/regexp";
import { LoginLayout } from "../../../layout/exports";
import { TForm, validate } from "../../../utils/validate";
import template from "./index.hbs";
import style from "./styles.module.pcss";

type Props = {
  style: typeof style;
  mailInput: Input;
  loginInput: Input;
  nameInput: Input;
  phoneInput: Input;
  surnameInput: Input;
  passwordInput: Input;
  passwordRetryInput: Input;
  registerBtn: Block;
  authBtn: Block;
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
        minLength: 4,
      },
    },
    login: {
      value: "",
      validate: {
        minLength: 3,
        maxLength: 20,
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
        minLength: 10,
        maxLength: 15,
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
    password_retry: {
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
            this.handleChangeBlur(event, input);
          },
        },
      });
    });

    this.children.registerBtn.setProps({
      events: { click: (event: Event) => this.handleClick(event) },
    });
  }

  handleChangeBlur(event: Event, input: Input) {
    const { value } = event.target as HTMLInputElement;

    const form = this.form[input.props.id];

    const { error } = validate(value, form.validate);

    form.value = value;
    form.error = error;

    input.setProps({ value, error });
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

      input.setProps({ value: form.value, error: form.error });
    });
  }

  getInputs() {
    return Object.values(this.children).reduce((acc, children) => {
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

const registerInstance = new RegisterPage({
  style,
  mailInput: new Input({
    label: "Почта",
    type: "text",
    id: "email",
    autofocus: true,
    required: true,
  }),
  loginInput: new Input({
    label: "Логин",
    type: "text",
    id: "login",
    required: true,
  }),
  nameInput: new Input({
    label: "Имя",
    type: "text",
    id: "first_name",
    required: true,
  }),
  surnameInput: new Input({
    label: "Фамилия",
    type: "text",
    id: "second_name",
    required: true,
  }),
  phoneInput: new Input({
    label: "Телефон",
    type: "text",
    id: "phone",
    required: true,
  }),
  passwordInput: new Input({
    label: "Пароль",
    type: "password",
    id: "password",
    required: true,
  }),
  passwordRetryInput: new Input({
    label: "Пароль (ещё раз)",
    type: "password",
    id: "password_retry",
    required: true,
  }),
  registerBtn: new Link({
    text: "Создать профиль",
    className: style.authBtn,
    to: "/messenger",
  }),
  authBtn: new Link({
    to: "/auth",
    text: "Войти",
    className: style.register,
  }),
});

export const registerPage = LoginLayout.bind(null, {
  content: registerInstance,
});
