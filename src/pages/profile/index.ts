import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { ProfileLayout } from "../../layout";
import { Avatar, Button, Link, ProfileInfoBlock } from "../../components";
import Block from "../../app/block";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";
import { authController } from "../../contollers";

type Props = {
  titleName: string,
  name: ChildType<ProfileInfoBlock>,
  email: ChildType<ProfileInfoBlock>,
  login: ChildType<ProfileInfoBlock>,
  surname: ChildType<ProfileInfoBlock>,
  nickname: ChildType<ProfileInfoBlock>,
  phone: ChildType<ProfileInfoBlock>,
  avatar: ChildType<Avatar>,
  editDataBtn: ChildType<Link>,
  editPasswordBtn: ChildType<Link>,
  exitBtn: ChildType<Button>,
  style?: typeof style
};

const defaultValues: Pick<Props, "style"> = { style };

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  init() {
  }

  render() {
    return this.compile(template, this.props);
  }
}

const src = "https://avatars.githubusercontent.com/u/43078049?v=4";

const profileProps: Props = ({
  name: {
    block: ProfileInfoBlock,
    props: {
      key: "Имя",
      value: "Рустам"
    },
    $$type: "child"
  },
  surname: {
    block: ProfileInfoBlock,
    props: {
      key: "Фамилия",
      value: "Султанбеков"
    },
    $$type: "child"
  },
  email: {
    block: ProfileInfoBlock,
    props: {
      key: "Почта",
      value: "RS@yandex.ru"
    },
    $$type: "child"
  },
  login: {
    block: ProfileInfoBlock,
    props: {
      key: "Логин",
      value: "EzFroze"
    },
    $$type: "child"
  },
  nickname: {
    block: ProfileInfoBlock,
    props: {
      key: "Имя в чате",
      value: "Руста"
    },
    $$type: "child"
  },
  phone: {
    block: ProfileInfoBlock,
    props: {
      key: "Телефон",
      value: "8 800-555-35-35"
    },
    $$type: "child"
  },
  titleName: "Рустам",
  avatar: {
    block: Avatar,
    props: { src },
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

export const profilePage: ChildType<ProfileLayout> = {
  block: ProfileLayout,
  props: {
    content: {
      block: ProfilePage,
      props: profileProps,
      $$type: "child"
    }
  },
  $$type: "child"
};
