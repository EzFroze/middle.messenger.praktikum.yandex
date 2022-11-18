import { AuthPostRequest, RegisterPostRequest } from "../../api/login-api/typings";
import { authAPI } from "../../api";
import { store } from "../../app/store";
import { router } from "../../app/router";
import { Routes } from "../../app/routes/typings";
import { createNotification } from "../../utils/create-notification";

class AuthController {
  async signup(data: RegisterPostRequest) {
    try {
      const result = await authAPI.signup(data);
      const {
        response,
      } = result;

      if (response.id) {
        router.go(Routes.MESSENGER_PAGE);
      } else {
        throw new Error(response.reason);
      }
    } catch (e) {
      createNotification({
        type: "danger",
        text: e.message
      });
    }
  }

  async signin(data: AuthPostRequest) {
    try {
      const {
        response,
        status
      } = await authAPI.signin(data);

      if (status === 200) {
        router.go(Routes.SETTINGS_PAGE);
      } else {
        throw new Error(response.reason);
      }
    } catch (e) {
      createNotification({
        type: "danger",
        text: e.message
      });
    }
  }

  async getUser() {
    try {
      const data = await authAPI.user();
      const {
        response: user,
        status
      } = data;

      if (
        status === 401
        && router.pathname !== Routes.AUTH_PAGE
      ) {
        router.go(Routes.AUTH_PAGE);

        createNotification({
          title: "Авторизуйтесь",
          text: "Вы не авторизованы",
          type: "danger"
        });
        return;
      }

      store.set("settings", user);
    } catch (e) {
      createNotification({
        type: "danger",
        text: e.message
      });
    }
  }

  async logout() {
    try {
      await authAPI.logout();

      store.set("settings", { id: 0 });

      router.go(Routes.AUTH_PAGE);

      createNotification({
        text: "Вы успешно вышли из аккаута",
        type: "success"
      });
    } catch (e) {
      createNotification({
        type: "danger",
        text: e.message
      });
    }
  }
}

export default new AuthController();
