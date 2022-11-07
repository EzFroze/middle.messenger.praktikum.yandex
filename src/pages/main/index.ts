import Block, { TProps } from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";

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
  authLink: new Link({
    text: "Авторизация",
    to: "/login/auth",
    className: style.link,
  }),
  registerLink: new Link({
    text: "Регистрация",
    to: "/login/register",
    className: style.link
  }),
  messengerLink: new Link({
    text: "Мессенджер",
    to: "/messenger",
    className: style.link
  }),
  profileLink: new Link({
    text: "Профиль",
    to: "/profile",
    className: style.link
  }),
  notFoundLink: new Link({
    text: "404",
    to: "/404",
    className: style.link
  }),
  errorLink: new Link({
    text: "500",
    to: "/500",
    className: style.link
  }),
};

class MainPage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const mainPage = MainPage.bind(null) as typeof Block;
