import { Notification, NotificationProps } from "../components";
import { ROOT_QUERY } from "../const";

export function createNotification(props: NotificationProps) {
  const root = document.querySelector(ROOT_QUERY);
  if (root) {
    const notification = new Notification(props);
    const fragment = notification.getContent();

    if (fragment) {
      root.append(fragment);
      notification.dispatchComponentDidMount();
    }
  }
}
