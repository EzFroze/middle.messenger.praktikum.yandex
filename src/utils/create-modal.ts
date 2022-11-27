import { ChildsRecord } from "../app/block/typings";
import { Modal } from "../components";
import { ROOT_QUERY } from "../const";

export function createModal(content: ChildsRecord, contentClass?: string) {
  const modal = new Modal({
    content,
    contentClass
  });

  const root = document.querySelector(ROOT_QUERY);

  if (root) {
    const fragment = modal.getContent();
    if (fragment) {
      root.append(fragment);
    }
  }

  return modal.dispatchComponentDidUnmount.bind(modal);
}
