import Cookies from 'js-cookie';

import { UI } from "./view.js";
import { URL } from './url.js';
import { renderMessageBlock, saveMessages } from "./render.js";
import { sendRequest } from './api.js';

const TOKEN_NAME = 'token';
const USER_EMAIL = 'email';

let socket;

export async function startChat() {
    const token = Cookies.get(TOKEN_NAME);

    if (!token) return;

    setWebSocket(token);
    downoadlMessageHistory(token);
}

UI.MESSAGE.BTN.addEventListener('click', sendMessage);
function sendMessage() {
    if (!UI.MESSAGE.INPUT.value) {
        return alert('Empty message, write something');
    }

    socket.send(JSON.stringify({ text: UI.MESSAGE.INPUT.value }));
    
    socket.onmessage = async function (event) {
        event.preventDefault();
        const obj = JSON.parse(event.data);

        const userEmail = Cookies.get(USER_EMAIL);
        const myMessage = obj.user.email === userEmail;
        let messageClass;

        if (myMessage) {
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

        UI.CHAT.BODY.scrollTop = UI.CHAT.BODY.scrollHeight;

        if (myMessage) UI.MESSAGE.FORM.reset();
    };    
}

function setWebSocket(token) {
    return socket = new WebSocket(`ws://chat1-341409.oa.r.appspot.com/websockets?${token}`);
}

async function downoadlMessageHistory(token) {
    const result = await sendRequest('GET', URL.MESSAGES, token, null);

    saveMessages(result);
}

startChat();