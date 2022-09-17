import {
  mainPage,
  profilePage,
  authPage,
  registerPage,
  messengerPage,
  page404,
  page500,
} from "../pages/exports";
import Block from "../app/block";

export const urls: Record<string, Block> = {
  main: mainPage,
  auth: authPage,
  register: registerPage,
  404: page404,
  500: page500,
  messenger: messengerPage,
  profile: profilePage,
};
