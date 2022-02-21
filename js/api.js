import { renderMessages } from "./render";

export async function sendRequest(method, url, token, body/* , onError, onSuccess */) {
    const result = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
        body: body,
    })

    if (method === 'GET') {
        renderMessages(result);
    }
}

