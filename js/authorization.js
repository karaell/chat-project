import Cookies from 'js-cookie';

import { UI } from "./view.js";
import { sendRequest, messageHistoryRequest } from './api.js';


const API = 'https://chat1-341409.oa.r.appspot.com/api';
const URL = `${API}/user`;
const URL_MESSAGES = `${API}/messages/`

const TOKEN_NAME = 'token';

UI.AUTORIZE.BTN.addEventListener('click', requestForCode);
function requestForCode() {
    const EMAIL = {
        email: UI.AUTORIZE.EMAIL.value,
    }

    const token = Cookies.get(TOKEN_NAME);
    
    sendRequest('POST', URL, token, JSON.stringify(EMAIL));
}

UI.CONFIRM.BTN.addEventListener('click', sendCode);
function sendCode() {
    const token = UI.CONFIRM.INPUT.value;

    Cookies.set(TOKEN_NAME, token);  
}

UI.SETTINGS.BTN.addEventListener('click', setUserName);
function setUserName() {
    const USER_NAME = {
        name: UI.SETTINGS.INPUT.value,
    }

    const token = Cookies.get(TOKEN_NAME);

    sendRequest('PATCH', URL, token, JSON.stringify(USER_NAME));
    sendRequest('GET', URL_MESSAGES, token, null);

    messageHistoryRequest(token);
}