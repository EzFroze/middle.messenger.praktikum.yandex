import { BaseAPI } from "../../app/http";
import { UserPassword, UserProfile, UserProfileAvatar } from "./typings";

export class SettingsAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  update(data: UserProfile) {
    return this.http.put("/profile", { data });
  }

  profileAvatar(data: UserProfileAvatar) {
    return this.http.put("/profile/avatar", {
      data,
      headers: []
    });
  }

  password(data: UserPassword) {
    return this.http.put("/password", { data });
  }

  create = undefined;

  request = undefined;

  delete = undefined;
}

export default new SettingsAPI();
