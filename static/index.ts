import Block from "../src/utils/block";
import { getTemplate } from "../src/utils/get-template";

const root = document.getElementById("root")!;

const template = getTemplate();

if (template instanceof Block) {
  root.appendChild(template.getContent()!);

  template.dispatchComponentDidMount();
} else {
  root.innerHTML = template;
}
