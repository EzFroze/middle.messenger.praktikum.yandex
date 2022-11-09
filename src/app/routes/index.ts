import {
  authPage,
  mainPage,
  messengerPage,
  page404,
  page500,
  profilePage,
  registerPage
} from "../../pages";
import { ChildsRecord } from "../block/typings";

export const routes: ChildsRecord = {
  "/": mainPage,
  "/login/auth": authPage,
  "/login/register": registerPage,
  "/404": page404,
  "/500": page500,
  "/messenger": messengerPage,
  "/profile": profilePage,
} as const;
