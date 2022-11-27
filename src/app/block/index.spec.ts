import { describe, it } from "mocha";
import assert from "assert";
import dom from "jsdom-global";
import Block from "./index";

class Test extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.compile(() => "<div>Это тестовый div</div>", this.props);
  }
}

dom();
const testBlock = new Test({});

describe("Работа класса Block", () => {
  before(() => {
    testBlock.setProps({ tested: true });
  });

  it("Проверка содержимого ", () => {
    assert.equal(testBlock.element?.innerHTML, "Это тестовый div");
  });

  it("Работа setProps", () => {
    assert.equal(testBlock.props.tested, true);

    testBlock.setProps({ tested: false });
    assert.equal(testBlock.props.tested, false);
  });
});
