import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import { loginLayout } from "../../../layout/login";
import { input } from "../../../components/exports";

const result = template({
  style,
  mailInput: input("Почта", "text", "email", true, true),
  loginInput: input("Логин", "text", "login", false, true),
  nameInput: input("Имя", "text", "first_name", false, true),
  surnameInput: input("Фамилия", "text", "second_name", false, true),
  phoneInput: input("Телефон", "text", "phone", false, true),
  passwordInput: input("Пароль", "password", "password", false, true),
  passwordRetryInput: input(
    "Пароль (ещё раз)",
    "password",
    "password",
    false,
    true
  ),
});

export const registerPage = loginLayout(result);
