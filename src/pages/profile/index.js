import template from "./index.hbs";
import * as style from "./styles.module.pcss";

import { profileLayout } from "../../layout/exports";

export const profilePage = profileLayout(template({ style }));
