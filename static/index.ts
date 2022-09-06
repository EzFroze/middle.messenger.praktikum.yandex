import { getTemplate } from "../src/utils/get-template";

const root = document.getElementById("root")!;

const template = getTemplate();

root.appendChild(template.getContent()!);

template.dispatchComponentDidMount();
