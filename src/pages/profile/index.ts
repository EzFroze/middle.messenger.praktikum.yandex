import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { ProfileLayout } from "../../layout/exports";
import { Avatar } from "../../components/exports";
import Block from "../../utils/block";

type Props = {
  style?: typeof style,
  name: string,
  email: string,
  login: string,
  surname: string,
  nickname: string,
  phone: string,
  avatar: Block
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

const props = {
  name: "Рустам",
  email: "RS@yandex.ru",
  login: "EzFroze",
  surname: "Султанбеков",
  nickname: "Руста",
  phone: "8 800-555-35-35",
};

const profileInstance = new ProfilePage({ ...props, avatar: avatarResult });

export const profilePage = new ProfileLayout({ content: profileInstance });
