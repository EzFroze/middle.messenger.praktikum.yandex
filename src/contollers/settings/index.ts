import { UserPassword, UserProfile } from "../../api/settings-api/typings";
import { settingsAPI } from "../../api";
import { createNotification } from "../../utils/create-notification";
import { store } from "../../app/store";
import { router } from "../../app/router";
import { Routes } from "../../app/routes/typings";

class SettingsController {
  async editProfileData(data: UserProfile) {
    try {
      const result = await settingsAPI.update(data);

      const {
        response,
        status
      } = result;

      if (status === 200) {
        store.set("settings", { ...response });
        router.go(Routes.SETTINGS_PAGE);
        createNotification({
          text: "Данные успешно обновлены",
          type: "success"
        });
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }

  async editAvatar(data: FileList) {
    try {
      const formData = new FormData();

      formData.append("avatar", data[0]);

      const result = await settingsAPI.profileAvatar(formData);

      const {
        response,
        status
      } = result;

      if (status === 200) {
        store.set("settings", { ...response });
        createNotification({
          text: "Аватар успешно обновлен",
          type: "success"
        });
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "success"
      });
    }
  }

  async editPassword(data: UserPassword) {
    try {
      const result = await settingsAPI.password(data);

      const {
        status,
        response
      } = result;

      if (status === 200) {
        router.go(Routes.SETTINGS_PAGE);

        createNotification({
          text: "Пароль успешно обновлен",
          type: "success"
        });
      } else {
        throw new Error(response.reason);
      }
    } catch (e) {
      createNotification({
        text: e.message,
        type: "danger"
      });
    }
  }
}

export default new SettingsController();
