import { UserPassword, UserProfile, UserProfileAvatar } from "../../api/settings-api/typings";
import { settingsAPI } from "../../api";
import { createNotification } from "../../utils/create-notification";
import { store } from "../../app/store";

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

  async editAvatar(data: UserProfileAvatar) {
    try {
      const result = await settingsAPI.profileAvatar(data);

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

      const { status } = result;

      if (status === 200) {
        createNotification({
          text: "Пароль успешно обновлен",
          type: "success"
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new SettingsController();
