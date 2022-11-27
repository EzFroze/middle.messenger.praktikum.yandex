import { API_URL } from "../../const";

class ResourcesController {
  getFile(path: string) {
    return `${API_URL}/resources${path}`;
  }
}

export default new ResourcesController();
