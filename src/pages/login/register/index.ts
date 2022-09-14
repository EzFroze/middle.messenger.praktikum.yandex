import style from "./styles.module.pcss";
import template from "./index.hbs";
import { LoginLayout } from "../../../layout/exports";
import { Input } from "../../../components/exports";
import Block, { TProps } from "../../../utils/block";
import { Button } from "../../../components/button";
import { TForm, validate } from "../../../utils/validate";

type Props = {
  style: typeof style,
  mailInput: Input,
  loginInput: Input,
  nameInput: Input,
  phoneInput: Input,
  surnameInput: Input,
  passwordInput: Input,
  passwordRetryInput: Input,
  registerBtn: Button
} & TProps;

export class RegisterPage extends Block<Props> {
  private form: TForm = {
    email: {
      value: "",
      validate: {
        regexp: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
        minLength: 4
      }
    },
    login: {
      value: "",
      validate: {}
    },
    first_name: {
      value: "",
      validate: {}
    },
    second_name: {
      value: "",
      validate: {}
    },
    phone: {
      value: "",
      validate: {}
    },
    password: {
      value: "",
      validate: {}
    },
    password_retry: {
      value: "",
      validate: {}
    },
  };

  constructor(props: Props) {
    super(props);
  }

  init() {
    const inputs = this.getInputs();
    const self = this;
    inputs.forEach((input) => {
      input.setProps({ events: {
        change(event: Event) { self.handleChangeInput(event, input); },
        focusout(event: Event) { self.handleBlurInput(event, input); }
      } });
    });

    this.children.registerBtn.setProps({
      events: { click: () => { console.log(this.form); } }
    });
  }

  handleChangeInput(event: Event, input: Input) {
    const { value } = event.target as HTMLInputElement;

    const form = this.form[input.props.id];

    form.value = value;

    input.setProps({ value });
  }

  handleBlurInput(_: Event, input: Input) {
    const form = this.form[input.props.id];

    const { error } = validate(form.value, form.validate);

    input.setProps({ error });
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
  mailInput: new Input({ label: "Почта", type: "text", id: "email", autofocus: true, required: true }),
  loginInput: new Input({ label: "Логин", type: "text", id: "login", required: true }),
  nameInput: new Input({ label: "Имя", type: "text", id: "first_name", required: true }),
  surnameInput: new Input({ label: "Фамилия", type: "text", id: "second_name", required: true }),
  phoneInput: new Input({ label: "Телефон", type: "text", id: "phone", required: true }),
  passwordInput: new Input({ label: "Пароль", type: "password", id: "password", required: true }),
  passwordRetryInput: new Input({ label: "Пароль (ещё раз)", type: "password", id: "password_retry", required: true }),
  registerBtn: new Button({ text: "Создать профиль", className: style.authBtn, type: "link", link: "/messenger" })
});

export const registerPage = new LoginLayout({ content: registerInstance });
