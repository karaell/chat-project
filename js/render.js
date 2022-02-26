import Cookies from 'js-cookie';

import { UI } from "./view.js";
import { renderTime } from "./time.js";

const USER_EMAIL = 'email';

const array = [];
const _array = [];

export async function saveMessages (result) {
    const response = await result.json();

    const userEmail = Cookies.get(USER_EMAIL);
    let messageClass;

    response.messages.forEach(i => {
        const myMessage = i.user.email === userEmail;

        if (myMessage) {
            messageClass = 'message message-from-me sent';
        } else {
            messageClass = 'message message-to-me';
        }

        const DATA = {
            NAME: i.user.name,
            TEXT_MESSAGE: i.text,
            TIME_MESSAGE: i.createdAt,
            CLASS: messageClass,
            EMAIL: i.user.email,
        }

        array.push(DATA)
    });

    array.reverse();

    renderMessages();
    UI.CHAT.BODY.scrollTop = UI.CHAT.BODY.scrollHeight;
}

function renderMessages () {
    const array3 = _array.concat(array.slice(0, 20))

    array.splice(0, 20);

    array3.forEach(i => {
        renderMessageBlock(i.CLASS, i.NAME, i.TEXT_MESSAGE, i.TIME_MESSAGE)
        UI.CHAT.BODY.prepend(template.content.cloneNode(true));
    })
}


UI.CHAT.BODY.addEventListener('scroll', scrollTop)
function scrollTop() {
    if (this.scrollTop === 0) {
        const previousScroll = UI.CHAT.BODY.scrollHeight - this.scrollTop;
        renderMessages();
        this.scrollTop = UI.CHAT.BODY.scrollHeight - previousScroll;
    } 
}


export function renderMessageBlock (blockClass, name, textMessage, timeMessage) {
    template.content.querySelector('.message').className = blockClass;
    template.content.querySelector('.text').textContent = name + ': ' + textMessage;
    template.content.querySelector('.time').textContent = renderTime(timeMessage);
}
