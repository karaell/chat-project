import { UI } from "./view.js";
import { renderMessageBlock } from "./render.js";
import Cookies from 'js-cookie';

const TOKEN_NAME = 'token';

UI.MESSAGE.BTN.addEventListener('click', sendMessage);

function sendMessage() {
    const token = Cookies.get(TOKEN_NAME);
    const socket = new WebSocket(`ws://chat1-341409.oa.r.appspot.com/websockets?${token}`);

    socket.onopen = function (e) {
        socket.send(JSON.stringify({ text: UI.MESSAGE.INPUT.value }));
    };

    socket.onmessage = function (event) {
        const obj = JSON.parse(event.data);

        let messageClass;

        if (obj.user.email === 'elenakara2@yandex.ru') {
            messageClass = 'message message-from-me sent';
        } else {
            messageClass = 'message message-to-me';
        }
        
        const DATA = {
            NAME: obj.user.name,
            TEXT_MESSAGE: obj.text,
            TIME_MESSAGE: obj.createdAt,
            CLASS: messageClass,
        }

        renderMessageBlock(DATA.CLASS, DATA.NAME, DATA.TEXT_MESSAGE, DATA.TIME_MESSAGE);

        UI.CHAT.BODY.append(template.content.cloneNode(true));

        UI.CHAT.BODY.scrollTo(UI.CHAT.BODY.scrollTop, UI.CHAT.BODY.scrollHeight);
        UI.MESSAGE.FORM.reset();
    };
}

/* function sendMessage() {
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
 */