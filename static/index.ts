import { router } from "../src/app/router";
import { routes } from "../src/app/routes";
import { registerHelpers } from "../src/utils/hbs";
import "./index.pcss";

registerHelpers();

window.addEventListener("DOMContentLoaded", () => {
  router.registerRoutes(routes)
    .start();
});
