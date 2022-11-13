import { AuthPostRequest, RegisterPostRequest } from "../../api/login-api/typings";
import { authAPI } from "../../api";
import { store } from "../../app/store";
import { router } from "../../app/router";
import { Routes } from "../../app/routes/typings";

class AuthController {
  async signup(data: RegisterPostRequest) {
    try {
      const result = await authAPI.signup(data);
      const {
        response,
      } = result;

      if (response.id) {
        router.go(Routes.MESSENGER_PAGE);
        return;
      }

      throw new Error(response.reason);
    } catch (e) {
      console.log(e);
    }
  }

  async signin(data: AuthPostRequest) {
    try {
      const result = await authAPI.signin(data);
      if (result.status === 200) {
        // await this.getUser();
        router.go(Routes.PROFILE_PAGE);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    const data = await authAPI.user();
    const user = data.response;
    store.set("user", user);
  }

  async logout() {
    try {
      await authAPI.logout();
      router.go(Routes.AUTH_PAGE);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
