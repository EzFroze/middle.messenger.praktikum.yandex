const EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const NAME = /^[А-ЯЁA-Z][а-яёa-z]*/;
const LOGIN = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]*/;
const PASSWORD = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const PHONE = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/;

export const patterns = {
  EMAIL,
  NAME,
  LOGIN,
  PASSWORD,
  PHONE,
};
