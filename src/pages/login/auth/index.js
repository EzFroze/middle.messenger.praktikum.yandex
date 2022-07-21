import style from "./styles.module.pcss";
import template from "./index.hbs";
import { loginLayout } from "../../../layout/login";

const result = template({ style });

export const authPage = loginLayout(result);
