import { UI } from "./view.js";
import { renderTime } from "./time.js"

UI.MESSAGE.BTN.addEventListener('click', sendMessage);

function sendMessage() {
    const textMessage = UI.MESSAGE.INPUT.value;
    const userName = 'Я';

    if (!textMessage) {
        return alert('Empty message, write something');
    }

    template.content.querySelector('.text').textContent = userName + ': ' + textMessage;
    template.content.querySelector('.time').textContent = renderTime();

    UI.CHAT.BODY.append(template.content.cloneNode(true));

    UI.CHAT.BODY.scrollTo(UI.CHAT.BODY.scrollTop, UI.CHAT.BODY.scrollHeight);
    UI.MESSAGE.FORM.reset();
}


