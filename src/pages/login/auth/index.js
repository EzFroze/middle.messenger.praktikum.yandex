import * as style from "./styles.module.pcss";
import template from "./index.hbs";
import { loginLayout } from "../../../layout/login";
import { input } from "../../../components/exports";

const result = template({
  style,
  loginInput: input("Логин", "text", "login", true, true),
  passwordInput: input("Пароль", "password", "password", false, true),
});

export const authPage = loginLayout(result);
