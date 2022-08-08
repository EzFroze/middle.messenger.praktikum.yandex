import template from "./index.hbs";

import { messengerLayout } from "../../layout/exports";
import { chat, chatList } from "../../modules/exports";
import { chatList as chatListMock } from "./mock";

const chatListResult = chatList(chatListMock);
const chatResult = chat();

const layout = messengerLayout(chatListResult, chatResult);

export const messengerPage = template({ content: layout });
