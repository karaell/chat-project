import { UI } from "./view.js";
import { renderTime } from "./time.js";

export async function renderMessages (result) {
    const response = await result.json();

    for (let i = 0; i < response.messages.length; i++) {
        const DATA = {
            NAME: 'Собеседник мой',
            TEXT_MESSAGE: response.messages[i].message,
            TIME_MESSAGE: response.messages[i].createdAt,
            CLASS: 'message message-to-me',
        }   

        renderMessageBlock (DATA.CLASS, DATA.NAME, DATA.TEXT_MESSAGE, DATA.TIME_MESSAGE);

        UI.CHAT.BODY.append(template.content.cloneNode(true));
    }
}

export function renderMessageBlock (blockClass, name, textMessage, timeMessage) {
    template.content.querySelector('.message').className = blockClass;
    template.content.querySelector('.text').textContent = name + ': ' + textMessage;
    template.content.querySelector('.time').textContent = renderTime(timeMessage);
}