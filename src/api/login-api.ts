import { Anfrage, BaseApi } from "../app/http";

const loginAPIInstance = new Anfrage("/auth");

type RegisterPostRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class RegisterApi extends BaseApi {
  create(data: RegisterPostRequest) {
    return loginAPIInstance.post("/signup", { data });
  }
}

type AuthPostRequest = {
  login: string;
  password: string;
};

export class AuthApi extends BaseApi {
  create(data: AuthPostRequest): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/signin", { data });
  }

  request(): Promise<XMLHttpRequest> {
    return loginAPIInstance.get("/user");
  }
}

export class LogoutApi extends BaseApi {
  create(): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/logout");
  }
}
