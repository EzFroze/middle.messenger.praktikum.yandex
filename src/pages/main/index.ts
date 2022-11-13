import Block, { TProps } from "../../app/block";
import { Link } from "../../components";
import template from "./index.hbs";
import * as style from "./styles.module.pcss";
import { ChildType } from "../../app/block/typings";
import { Routes } from "../../app/routes/typings";

type Props = {
  style?: typeof style;
  authLink: ChildType<Link>;
  registerLink: ChildType<Link>;
  messengerLink: ChildType<Link>;
  profileLink: ChildType<Link>;
  notFoundLink: ChildType<Link>;
  errorLink: ChildType<Link>;
} & TProps;

const defaultValues: Pick<Props, "style"> = {
  style
};

class MainPage extends Block<Props> {
  constructor(props: Props) {
    super({ ...defaultValues, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const mainPage: ChildType<MainPage> = {
  block: MainPage,
  props: {
    authLink: {
      block: Link,
      props: {
        text: "Авторизация",
        to: Routes.AUTH_PAGE,
        className: style.link,
      },
      $$type: "child"
    },
    registerLink: {
      block: Link,
      props: {
        text: "Регистрация",
        to: Routes.REGISTER_PAGE,
        className: style.link
      },
      $$type: "child"
    },
    messengerLink: {
      block: Link,
      props: {
        text: "Мессенджер",
        to: Routes.MESSENGER_PAGE,
        className: style.link
      },
      $$type: "child"
    },
    profileLink: {
      block: Link,
      props: {
        text: "Профиль",
        to: Routes.PROFILE_PAGE,
        className: style.link
      },
      $$type: "child"
    },
    notFoundLink: {
      block: Link,
      props: {
        text: "404",
        to: Routes.PAGE_404,
        className: style.link
      },
      $$type: "child"
    },
    errorLink: {
      block: Link,
      props: {
        text: "500",
        to: Routes.PAGE_500,
        className: style.link
      },
      $$type: "child"
    },
  },
  $$type: "child"
};
