import Block from "../../../app/block";
import template from "./index.hbs";
import style from "./styles.module.pcss";
import { ChildType } from "../../../app/block/typings";
import { Button, Input, Link } from "../../../components";
import { connect } from "../../../app/store/helpers";
import { Routes } from "../../../app/routes/typings";
import { StoreState } from "../../../app/store/typings";
import { authController, settingsController } from "../../../contollers";
import { TForm, validate } from "../../../utils/validate";
import { patterns } from "../../../const/regexp";
import { UserProfile } from "../../../api/settings-api/typings";

type Props = {
  first_name: ChildType<Input>,
  email: ChildType<Input>,
  login: ChildType<Input>,
  second_name: ChildType<Input>,
  display_name: ChildType<Input>,
  phone: ChildType<Input>,
  saveButton: ChildType<Button>,
  backLink: ChildType<Link>
  style?: typeof style,
  state?: StoreState["settings"]
};

const defaultProps: Pick<Props, "style"> = {
  style
};

class SettingsEditDataPage extends Block<Props> {
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
          errorMessage: "Отображаемое имя",
        },
      },
    },
    display_name: {
      value: "",
      validate: {
        minLength: {
          length: 3
        },
        maxLength: {
          length: 20
        },
        regexp: {
          pattern: patterns.NAME,
          errorMessage: "Отображаемое имя",
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
  };

  constructor(props: Props) {
    super({ ...defaultProps, ...props });
  }

  async init() {
    await authController.getUser();

    this.setValues();
    this.setInputsEvent();

    this.children.saveButton.setProps({
      events: { click: this.handleClickSaveData.bind(this) }
    });
  }

  setValues() {
    if (!this.props.state) return;
    Object.entries(this.props.state)
      .forEach(([key, value]) => {
        if (this.children[key]) {
          this.children[key].setProps({ value });
          this.form[key].value = value as string;
        }
      });
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

  setInputsEvent() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      input.setProps({
        events: {
          focusout: (event: Event) => {
            const {
              id,
              value
            } = event.target as HTMLInputElement;

            const form = this.form[id];

            const {
              error,
              value: validateValue
            } = validate(value, form.validate);

            this.children[id].setProps({
              value: validateValue,
              error
            });
            form.value = value;
          }
        }
      });
    });
  }

  handleClickSaveData() {
    const inputs = this.getInputs();

    let hasError = false;

    inputs.forEach((input) => {
      const {
        id,
      } = input.props;
      const form = this.form[id];
      const {
        error
      } = validate(form.value, form.validate);

      if (error) {
        hasError = true;
        input.setProps({ error });
      }
    });

    if (hasError) return;

    const form = Object.entries(this.form)
      .reduce<Record<string, any>>((acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    }, {}) as UserProfile;

    settingsController.editProfileData(form);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const settingsEditDataPageProps: Props = {
  first_name: {
    block: Input,
    props: {
      id: "first_name",
      type: "text",
      label: "Имя",
      required: true,
    },
    $$type: "child"
  },
  second_name: {
    block: Input,
    props: {
      id: "second_name",
      type: "text",
      label: "Фамилия",
      required: true
    },
    $$type: "child"
  },
  email: {
    block: Input,
    props: {
      id: "email",
      type: "text",
      label: "Email",
      required: true,
      autofocus: true
    },
    $$type: "child"
  },
  login: {
    block: Input,
    props: {
      id: "login",
      type: "text",
      label: "Логин",
      required: true
    },
    $$type: "child"
  },
  display_name: {
    block: Input,
    props: {
      id: "display_name",
      type: "text",
      label: "Отображаемое имя",
      required: true
    },
    $$type: "child"
  },
  phone: {
    block: Input,
    props: {
      id: "phone",
      type: "text",
      label: "Телефон",
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
      text: "Назад",
      to: Routes.SETTINGS_PAGE,
      className: style.backLink
    },
    $$type: "child"
  }
};

export const settingsEditDataPage: ChildType<SettingsEditDataPage> = connect({
  block: SettingsEditDataPage,
  props: settingsEditDataPageProps,
  $$type: "child"
}, ({
  settings: {
    first_name,
    display_name,
    second_name,
    email,
    login,
    phone,
    id
  }
}) => {
  return {
    first_name,
    display_name,
    second_name,
    email,
    login,
    phone,
    id
  };
});
