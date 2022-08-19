import { urls } from "../const";

export function getTemplate() {
  let { pathname } = window.location;

  if (!pathname) return urls["404"];

  if (pathname.length === 1) {
    return urls.main;
  }

  if (pathname.length > 1) {
    pathname = pathname.slice(1);
    if (!urls[pathname]) {
      return urls["404"];
    }
  }

  return urls[pathname];
}
