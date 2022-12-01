import Block from "../../../app/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";
import { ChildType } from "../../../app/block/typings";
import { Button, Input, Link } from "../../../components";
import { Routes } from "../../../app/routes/typings";
import { TForm, validate } from "../../../utils/validate";
import { settingsController } from "../../../contollers";

type Props = {
  oldPassword: ChildType<Input>,
  newPassword: ChildType<Input>,
  saveButton: ChildType<Button>,
  backLink: ChildType<Link>
  style?: typeof style
};

const defaultProps: Pick<Props, "style"> = {
  style
};

class SettingsEditPasswordPage extends Block<Props> {
  form: TForm = {
    old_password: {
      value: "",
      validate: {
        minLength: {
          length: 1,
          errorMessage: "Поле не может быть пустым"
        }
      }
    },
    new_password: {
      value: "",
      validate: {
        minLength: {
          length: 1,
          errorMessage: "Поле не может быть пустым"
        }
      }
    }
  };

  constructor(props: Props) {
    super({ ...defaultProps, ...props });
  }

  init() {
    this.children.saveButton.setProps({
      events: {
        click: this.handleClick.bind(this)
      }
    });

    this.setEvents();
  }

  getInputs() {
    return Object.values(this.children)
      .reduce<Input[]>((acc, child) => {
      if (child instanceof Input) {
        acc.push(child);
      }
      return acc;
    }, []);
  }

  setEvents() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;

            this.form[input.props.id].value = target.value;

            input.setProps({
              value: target.value
            });

            this.validate();
          }
        }
      });
    });
  }

  validate() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      const form = this.form[input.props.id];
      const {
        value,
        error
      } = validate(form.value, form.validate);

      input.setProps({
        value,
        error
      });

      form.error = error;
    });
  }

  handleClick() {
    this.validate();

    let hasError = false;

    Object.values(this.form)
      .forEach((form) => {
        if (form.error) {
          hasError = true;
        }
      });

    if (hasError) {
      return;
    }

    settingsController.editPassword({
      oldPassword: this.form.old_password.value,
      newPassword: this.form.new_password.value
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const settingsEditPasswordPage: ChildType<SettingsEditPasswordPage> = {
  block: SettingsEditPasswordPage,
  props: {
    oldPassword: {
      block: Input,
      props: {
        id: "old_password",
        type: "password",
        label: "Старый пароль",
        required: true
      },
      $$type: "child"
    },
    newPassword: {
      block: Input,
      props: {
        id: "new_password",
        type: "password",
        label: "Новый пароль",
        required: true
      },
      $$type: "child"
    },
    saveButton: {
      block: Button,
      props: {
        text: "Сохранить",
        className: style.saveBtn
      },
      $$type: "child"
    },
    backLink: {
      block: Link,
      props: {
        to: Routes.SETTINGS_PAGE,
        text: "Назад",
        className: style.backLink
      },
      $$type: "child"
    }
  },
  $$type: "child"
};
