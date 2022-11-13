import { BaseAPI } from "../../app/http";
import { AuthPostRequest, RegisterPostRequest } from "./typings";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signup(data: RegisterPostRequest): Promise<XMLHttpRequest> {
    return this.http.post("/signup", { data });
  }

  signin(data: AuthPostRequest): Promise<XMLHttpRequest> {
    return this.http.post("/signin", { data });
  }

  user(): Promise<XMLHttpRequest> {
    return this.http.get("/user");
  }

  logout(): Promise<XMLHttpRequest> {
    return this.http.post("/logout");
  }

  create = undefined;

  request = undefined;

  delete = undefined;

  update = undefined;
}

export default new AuthAPI();
