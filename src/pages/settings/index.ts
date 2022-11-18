import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { ProfileLayout } from "../../layout";
import { Avatar, Button, Link, ProfileInfoBlock } from "../../components";
import Block from "../../app/block";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";
import { authController, resourcesController, settingsController } from "../../contollers";
import { connect } from "../../app/store/helpers";
import { StoreState } from "../../app/store/typings";

type Props = {
  titleName: string,
  first_name: ChildType<ProfileInfoBlock>,
  email: ChildType<ProfileInfoBlock>,
  login: ChildType<ProfileInfoBlock>,
  second_name: ChildType<ProfileInfoBlock>,
  display_name: ChildType<ProfileInfoBlock>,
  phone: ChildType<ProfileInfoBlock>,
  avatar: ChildType<Avatar>,
  editDataBtn: ChildType<Link>,
  editPasswordBtn: ChildType<Link>,
  exitBtn: ChildType<Button>,
  style?: typeof style,
  state?: StoreState["settings"]
};

const defaultValues: Pick<Props, "style"> = { style };

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  async init() {
    await authController.getUser();

    this.children.avatar.setProps({
      events: {
        change: this.handleClickInput.bind(this)
      }
    });

    this.setValues();
    this.setDisplayName();
    this.setAvatar();
  }

  setValues() {
    if (!this.props.state) return;
    Object.entries(this.props.state)
      .forEach(([key, value]) => {
        if (this.children[key]) {
          this.children[key].setProps({ value });
        }
      });
  }

  setDisplayName() {
    const displayName = this.props.state?.display_name;
    if (displayName) {
      this.setProps({ titleName: displayName });
    }
  }

  setAvatar() {
    const avatar = this.props.state?.avatar as string;
    this.children.avatar.props.src = resourcesController.getFile(avatar);
  }

  async handleClickInput(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files) return;

    await settingsController.editAvatar(target.files);
    this.setAvatar();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const profileProps: Props = ({
  first_name: {
    block: ProfileInfoBlock,
    props: {
      key: "Имя",
      value: "",
    },
    $$type: "child"
  },
  second_name: {
    block: ProfileInfoBlock,
    props: {
      key: "Фамилия",
      value: "",
    },
    $$type: "child"
  },
  email: {
    block: ProfileInfoBlock,
    props: {
      key: "Почта",
      value: "",
    },
    $$type: "child"
  },
  login: {
    block: ProfileInfoBlock,
    props: {
      key: "Логин",
      value: ""
    },
    $$type: "child"
  },
  display_name: {
    block: ProfileInfoBlock,
    props: {
      key: "Имя в чате",
      value: ""
    },
    $$type: "child"
  },
  phone: {
    block: ProfileInfoBlock,
    props: {
      key: "Телефон",
      value: ""
    },
    $$type: "child"
  },
  titleName: "",
  avatar: {
    block: Avatar,
    props: {},
    $$type: "child"
  },
  editDataBtn: {
    block: Link,
    props: {
      to: Routes.MAIN_PAGE,
      className: style.key,
      text: "Изменить данные"
    },
    $$type: "child"
  },
  editPasswordBtn: {
    block: Link,
    props: {
      to: Routes.MAIN_PAGE,
      className: style.key,
      text: "Изменить пароль"
    },
    $$type: "child"
  },
  exitBtn: {
    block: Button,
    props: {
      className: `${style.red} ${style.key} ${style.btn}`,
      text: "Выход",
      events: {
        click: () => {
          authController.logout();
        }
      }
    },
    $$type: "child"
  }
});

const WithStore = connect<ProfilePage>({
  block: ProfilePage,
  props: profileProps,
  $$type: "child"
}, (state) => state.settings);

export const profilePage: ChildType<ProfileLayout> = {
  block: ProfileLayout,
  props: {
    content: WithStore
  },
  $$type: "child"
};
