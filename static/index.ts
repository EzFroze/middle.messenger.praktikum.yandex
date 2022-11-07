import { Router } from "../src/app/router";
import { routes } from "../src/app/routes";

window.addEventListener("DOMContentLoaded", () => {
  Router.registerRoutes(routes)
    .start();
});
