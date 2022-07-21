import { getTemplate } from "../src/utils/get-template";

const root = document.getElementById("root");

if (!root) return;

root.innerHTML = getTemplate();
