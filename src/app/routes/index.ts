import {
  authPage,
  mainPage,
  messengerPage,
  page404,
  page500,
  profilePage,
  registerPage,
} from "../../pages/exports";

export const routes = {
  "/": mainPage,
  "/auth": authPage,
  "/register": registerPage,
  "/404": page404,
  "/500": page500,
  "/messenger": messengerPage,
  "/profile": profilePage,
} as const;
