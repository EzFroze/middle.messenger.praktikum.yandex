import style from "./styles.module.pcss";
import template from "./index.hbs";
import Block, { TProps } from "../../app/block";
import { Link } from "../../components/exports";

type Props = {
  style?: typeof style;
  authLink: Block;
  registerLink: Block;
  messengerLink: Block;
  profileLink: Block;
  notFoundLink: Block;
  errorLink: Block;
} & TProps;

const defaultValues: Props = {
  style,
  authLink: new Link({ text: "Авторизация", to: "/auth" }),
  registerLink: new Link({ text: "Регистрация", to: "/register" }),
  messengerLink: new Link({ text: "Мессенджер", to: "/messenger" }),
  profileLink: new Link({ text: "Профиль", to: "/profile" }),
  notFoundLink: new Link({ text: "404", to: "/404" }),
  errorLink: new Link({ text: "500", to: "/500" }),
};
class MainPage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const mainPage = MainPage.bind(null);
