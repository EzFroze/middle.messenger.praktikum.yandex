import { BaseAPI } from "../../app/http";
import { ResourcesCreate } from "./typings";

export class ResourcesAPI extends BaseAPI {
  constructor() {
    super("/resources");
  }

  request(path: string) {
    return this.http.get(path);
  }

  create(data: ResourcesCreate) {
    return this.http.post("/", {
      data,
      headers: []
    });
  }

  delete = undefined;

  update = undefined;
}

export default new ResourcesAPI();
