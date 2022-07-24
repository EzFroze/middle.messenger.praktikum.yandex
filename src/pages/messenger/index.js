import template from "./index.hbs";

import { messengerLayout } from "../../layout/exports";
import { chatList } from "../../modules/exports";
import { chatList as chatListMock } from "./mock";

const chatListResult = chatList(chatListMock);

const layout = messengerLayout(chatListResult, "<h2>Chat</h2>");

export const messengerPage = template({ content: layout });
