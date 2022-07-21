import { page500 } from "../pages/exports";
import { authPage } from "../pages/exports";
import { registerPage } from "../pages/exports";
import { page404 } from "../pages/exports";

export const urls = {
  auth: authPage,
  register: registerPage,
  404: page404,
  500: page500,
};
