import Cookies from 'js-cookie';

import { UI } from "./view.js";
import { renderTime } from "./time.js";

const USER_EMAIL = 'email';

export async function renderMessages (result) {
    const response = await result.json();

    const userEmail = Cookies.get(USER_EMAIL);
    let messageClass;

    console.log(response)

    for (let i = 0; i < response.messages.length; i++) {

        const myMessage = response.messages[i].user.email === userEmail;

        if (myMessage) {
            messageClass = 'message message-from-me sent';
        } else {
            messageClass = 'message message-to-me';
        }

        // СТАРАЯ ВЕРСИЯ - ВСЕ БЛИН РАБОТАЕТ
        /* const DATA = {
            NAME: response.messages[i].username,
            TEXT_MESSAGE: response.messages[i].message,
            TIME_MESSAGE: response.messages[i].createdAt,
            CLASS: messageClass,
        } */   

        //  НОВАЯ - КОНЕЦ
        const DATA = {
            NAME: response.messages[i].user.name,
            TEXT_MESSAGE: response.messages[i].text,
            TIME_MESSAGE: response.messages[i].createdAt,
            CLASS: messageClass,
        }  

        renderMessageBlock (DATA.CLASS, DATA.NAME, DATA.TEXT_MESSAGE, DATA.TIME_MESSAGE);

        UI.CHAT.BODY.append(template.content.cloneNode(true));
    }

    UI.CHAT.BODY.scrollTo(UI.CHAT.BODY.scrollTop, UI.CHAT.BODY.scrollHeight);
}

export function renderMessageBlock (blockClass, name, textMessage, timeMessage) {
    template.content.querySelector('.message').className = blockClass;
    template.content.querySelector('.text').textContent = name + ': ' + textMessage;
    template.content.querySelector('.time').textContent = renderTime(timeMessage);
}