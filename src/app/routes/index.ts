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
import { Routes } from "./typings";

export const routes: ChildsRecord = {
  [Routes.MAIN_PAGE]: mainPage,
  [Routes.AUTH_PAGE]: authPage,
  [Routes.REGISTER_PAGE]: registerPage,
  [Routes.PAGE_404]: page404,
  [Routes.PAGE_500]: page500,
  [Routes.MESSENGER_PAGE]: messengerPage,
  [Routes.PROFILE_PAGE]: profilePage,
} as const;
