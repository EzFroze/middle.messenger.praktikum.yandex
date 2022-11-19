import { ChildsRecord } from "../app/block/typings";
import { Modal } from "../components";
import { ROOT_QUERY } from "../const";

export function createModal(content: ChildsRecord) {
  const modal = new Modal({ content });

  const root = document.querySelector(ROOT_QUERY);

  if (root) {
    const fragment = modal.getContent();
    if (fragment) {
      root.append(fragment);
    }
  }
}
