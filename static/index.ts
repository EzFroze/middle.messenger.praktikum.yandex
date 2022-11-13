import { router } from "../src/app/router";
import { routes } from "../src/app/routes";

window.addEventListener("DOMContentLoaded", () => {
  router.registerRoutes(routes)
    .start();
});
