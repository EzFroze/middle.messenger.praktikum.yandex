import { describe, it } from "mocha";
import assert from "assert";
import { JSDOM } from "jsdom";

const { window } = new JSDOM("<div id='root'></div>", { url: "http://localhost" });

// @ts-ignore
global.window = window;

describe("Проверка роутера", () => {
  it("Переход на новую страницу должен менять history", () => {
    window.history.pushState({ page: "auth" }, "Auth", "/sign-in");
    window.history.pushState({ page: "register" }, "Register", "/sign-up");
    assert.equal(window.history.length, 3);
  });
});
