/* eslint-disable no-useless-escape */
const EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NAME = /^[А-ЯЁA-Z][а-яёa-z]*/gi;
const LOGIN = /^[a-zA-Z][a-zA-Z0-9-_]/g;
const PASSWORD = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;
const PHONE = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/g;

export const patterns = {
  EMAIL, NAME, LOGIN, PASSWORD, PHONE
};
