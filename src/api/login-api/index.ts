import { Anfrage, BaseApi } from "../../app/http";
import { AuthPostRequest, RegisterPostRequest } from "./typings";

const loginAPIInstance = new Anfrage("/auth");

abstract class LoginApiAbstract {
  abstract signup(data: RegisterPostRequest): Promise<XMLHttpRequest>;

  abstract signin(data: AuthPostRequest): Promise<XMLHttpRequest>;

  abstract user(): Promise<XMLHttpRequest>;

  abstract logout(): Promise<XMLHttpRequest>;
}

export class LoginApi extends BaseApi implements LoginApiAbstract {
  signup(data: RegisterPostRequest): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/signin", { data });
  }

  signin(data: AuthPostRequest): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/signin", { data });
  }

  user(): Promise<XMLHttpRequest> {
    return loginAPIInstance.get("/user");
  }

  logout(): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/logout");
  }
}
