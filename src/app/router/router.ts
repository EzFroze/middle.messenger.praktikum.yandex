import { ROOT_QUERY } from "../../const";
import { Route } from "./route";
import { ChildsRecord, ChildType } from "../block/typings";
import { Routes } from "../routes/typings";

export class Router {
  static __instance: Router;

  routes: Route[];

  history: History;

  pathname: string;

  private _currentRoute: Route | null;

  private readonly _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // отрубаем это правило тут, так как нам нужен singleton
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.pathname = window.location.pathname;

    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: ChildType) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  public registerRoutes(routes: ChildsRecord) {
    Object.entries(routes)
      .forEach(([path, block]) => {
        this.use(path, block);
      });

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (!event.currentTarget) return;
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const errorPage = this.routes.find((r) => r.pathname === "/404");

      if (errorPage) this._onRoute(errorPage.pathname);
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: Routes) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router(ROOT_QUERY);
