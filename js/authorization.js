import Cookies from 'js-cookie';

import { UI } from "./view.js";
import { URL } from './url.js';

import { sendRequest } from './api.js';
import { startChat } from './main.js';

const TOKEN_NAME = 'token';
const USER_EMAIL = 'email';

UI.AUTORIZE.BTN.addEventListener('click', requestForCode);
function requestForCode() {
    const EMAIL = {
        email: UI.AUTORIZE.EMAIL.value,
    }
    Cookies.set(USER_EMAIL, EMAIL.email)
    
    const token = Cookies.get(TOKEN_NAME);
    
    sendRequest('POST', URL.USER, token, JSON.stringify(EMAIL));
}

UI.CONFIRM.BTN.addEventListener('click', sendCode);
function sendCode() {
    const token = UI.CONFIRM.INPUT.value;

    Cookies.set(TOKEN_NAME, token);  

    startChat();
}

UI.SETTINGS.BTN.addEventListener('click', setUserName);
function setUserName() {
    const USER_NAME = {
        name: UI.SETTINGS.INPUT.value,
    }

    const token = Cookies.get(TOKEN_NAME);

    sendRequest('PATCH', URL.USER, token, JSON.stringify(USER_NAME));
}
