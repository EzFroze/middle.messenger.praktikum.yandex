import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { profileLayout } from "../../layout/exports";
import { avatar } from "../../components/exports";

const src = "https://avatars.githubusercontent.com/u/43078049?v=4";

const avatarResult = avatar(src);

const props = {
  name: "Рустам",
  email: "RS@yandex.ru",
  login: "EzFroze",
  surname: "Султанбеков",
  nickname: "Руста",
  phone: "8 800-555-35-35",
};

export const profilePage = profileLayout(
  template({ style, avatar: avatarResult, ...props })
);
