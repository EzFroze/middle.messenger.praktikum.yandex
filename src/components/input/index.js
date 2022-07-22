import style from "./styles.module.pcss";
import template from "./index.hbs";

export const input = (
  label = "",
  type = "text",
  id = "",
  autofocus = false,
  required = false
) => {
  return template({ style, label, type, id, autofocus, required });
};
