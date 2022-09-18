import { Router } from "../src/app/router";
import { routes } from "../src/app/routes";

const router = new Router("#root");

window.addEventListener("DOMContentLoaded", () => {
  router.registerRoutes(routes);
  router.start();
});
