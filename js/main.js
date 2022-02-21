import { UI } from "./view.js";
import { renderMessageBlock } from "./render.js";

UI.MESSAGE.BTN.addEventListener('click', sendMessage);

function sendMessage() {
    const DATA = {
        NAME: 'Я',
        TEXT_MESSAGE: UI.MESSAGE.INPUT.value,
        CLASS: 'message message-from-me sent',
    }

    if (!DATA.TEXT_MESSAGE) {
        return alert('Empty message, write something');
    }

    renderMessageBlock(DATA.CLASS, DATA.NAME, DATA.TEXT_MESSAGE, null);

    UI.CHAT.BODY.append(template.content.cloneNode(true));

    UI.CHAT.BODY.scrollTo(UI.CHAT.BODY.scrollTop, UI.CHAT.BODY.scrollHeight);
    UI.MESSAGE.FORM.reset();
}


