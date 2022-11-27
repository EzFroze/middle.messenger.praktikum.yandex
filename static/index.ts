import { router } from "../src/app/router";
import { routes } from "../src/app/routes";
import { registerHelpers } from "../src/utils/handlebars-helpers";

registerHelpers();

window.addEventListener("DOMContentLoaded", () => {
  router.registerRoutes(routes)
    .start();
});
