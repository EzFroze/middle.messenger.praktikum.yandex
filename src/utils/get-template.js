import { urls } from "../const";

export function getTemplate() {
  let pathname = window.location.pathname;

  if (!pathname) return urls["404"];

  if (pathname.length === 1) {
    window.location.href = "/auth"; // Временное решение чтобы попадать на авторизацию
  }

  if (pathname.length > 1) {
    pathname = pathname.slice(1);
    if (!urls[pathname]) {
      window.location.href = "/404";
    }
  }

  return urls[pathname];
}
