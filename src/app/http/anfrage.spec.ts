import { describe, it } from "mocha";
import assert from "assert";
import { AnfrageBase } from "./anfrage";

global.XMLHttpRequest = require("xhr2");

const url = "https://jsonplaceholder.typicode.com";

const http = new AnfrageBase();

describe("Работа HTTP модуля", () => {
  it("Провека подстановки get параметров", async () => {
    return http.get(`${url}/comments`, { data: { postId: 1 } })
      .then((res) => {
        assert.equal(res.responseURL, `${url}/comments?postId=1`);
      });
  });
});
