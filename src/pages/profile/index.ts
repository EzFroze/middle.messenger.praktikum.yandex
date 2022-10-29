import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { ProfileLayout } from "../../layout";
import { Avatar, Link, ProfileInfoBlock } from "../../components";
import Block from "../../app/block";

type Props = {
  titleName: string,
  name: ProfileInfoBlock,
  email: ProfileInfoBlock,
  login: ProfileInfoBlock,
  surname: ProfileInfoBlock,
  nickname: ProfileInfoBlock,
  phone: ProfileInfoBlock,
  avatar: Block,
  editDataBtn: Block,
  editPasswordBtn: Block,
  exitBtn: Block,
  style?: typeof style
};

const defaultValues: Pick<Props, "style"> = { style };

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const src = "https://avatars.githubusercontent.com/u/43078049?v=4";

const avatarResult = new Avatar({ src });

const infoBlock = {
  name: new ProfileInfoBlock({
    key: "Имя",
    value: "Рустам"
  }),
  surname: new ProfileInfoBlock({
    key: "Фамилия",
    value: "Султанбеков"
  }),
  email: new ProfileInfoBlock({
    key: "Почта",
    value: "RS@yandex.ru"
  }),
  login: new ProfileInfoBlock({
    key: "Логин",
    value: "EzFroze"
  }),
  nickname: new ProfileInfoBlock({
    key: "Имя в чате",
    value: "Руста"
  }),
  phone: new ProfileInfoBlock({
    key: "Телефон",
    value: "8 800-555-35-35"
  }),
};

const profileInstance = new ProfilePage({
  ...infoBlock,
  titleName: "Рустам",
  avatar: avatarResult,
  editDataBtn: new Link({
    to: "/",
    className: style.key,
    text: "Изменить данные"
  }),
  editPasswordBtn: new Link({
    to: "/",
    className: style.key,
    text: "Изменить пароль"
  }),
  exitBtn: new Link({
    to: "/",
    className: `${style.red} ${style.key}`,
    text: "Выход"
  })
});

export const profilePage = ProfileLayout.bind(null, { content: profileInstance }) as typeof Block;
